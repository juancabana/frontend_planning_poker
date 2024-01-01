import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { HttpService } from '../../services/http-service/http-service.service';

import { UserModalComponent } from '../../components/templates/user-modal/user-modal.template';
import { AdminModalComponent } from '../../components/templates/admin-modal/admin-modal.template';

import { User } from '../../interfaces/user.interface';
import { Room } from '../../interfaces/room.interface';
import { CardRevealed } from '../../interfaces/card-revealed.interface';
import { CardSelected } from '../../interfaces/card-selected.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.sass'],
})
export class RoomComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public user!: User;
  public players: User[] = [];
  public cardsSelected: any[] = [];
  public room!: Room;
  public isRevealable: Boolean = false;
  public isAvaliableToRestart: Boolean = false;
  public countingVotes: Boolean = false;

  constructor(
    public socketService: WebSocketService,
    private readonly httpService: HttpService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.httpService.getRoom()) {
      this.room = this.httpService.getRoom()!;
      this.socketService.setupSocketConnection(this.room);
      this.createUser();
    }
  }

  openCreateUserDialog(): MatDialogRef<UserModalComponent> {
    const dialogRef = this.dialog.open(UserModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: this.room._id },
    });
    return dialogRef;
  }

  createUser() {
    this.openCreateUserDialog()
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        const user = this.getUser();
        this.user = user;
        this.listenNewUser();
        this.getPlayersInCache();
        this.listenCardRevealed();
        this.listenRestartGame();
      });
  }

  allPlayersSelectedCard(): boolean {
    const usersTypePlayers = this.players.filter(
      ({ visualization }) => visualization == 'player'
    );
    return usersTypePlayers.every((player) => player.selected_card! > -3);
  }

  activateCountingOrReveal() {
    if (this.allPlayersSelectedCard()) {
      if (this.user.is_owner) {
        this.isRevealable = true;
      } else {
        this.countingVotes = true;
      }
    }
  }

  listenNewUser() {
    this.socketService
      .listenNewUser()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: User[]) => {
          if (!this.exists(this.user)) {
            this.players = [this.user, ...data];
            this.setFirstPosition();
          } else {
            this.players = [...data];
            this.setFirstPosition();
          }
          this.activateCountingOrReveal();
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }

  listenRestartGame() {
    this.socketService
      .listenRestartGame()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((players) => {
        this.players = players;
        players.map((player) => {
          player._id == this.user._id
            ? (this.user.is_owner = player.is_owner)
            : false;
        });

        this.isAvaliableToRestart = false;
        this.isRevealable = false;
        this.cardsSelected = [];
        this.countingVotes = false;
      });
  }

  listenCardRevealed() {
    this.socketService
      .listenCardRevealed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: CardRevealed[]) => {
        this.cardsSelected = data;
        this.countingVotes = false;
      });
  }

  getPlayersInCache() {
    this.httpService.getPlayers(this.room._id!).subscribe({
      next: (cachedPlayers) => {
        if (
          !cachedPlayers.some((element: User) => element._id == this.user._id)
        ) {
          this.players = [this.user, ...cachedPlayers];
          this.setFirstPosition();
        } else {
          this.players = cachedPlayers;
          this.setFirstPosition();
        }
      },
    });
  }

  setFirstPosition() {
    let userIndex = this.players.findIndex(
      (player) => this.user._id === player._id
    );
    if (userIndex !== -1) {
      let user = this.players.splice(userIndex, 1)[0];
      this.players.unshift(user);
    }
  }

  exists = (userToEvaluate: User) =>
    this.players.some((element) => element._id == userToEvaluate._id);

  getUser() {
    const userInLocalStorage = localStorage.getItem('user');
    return JSON.parse(userInLocalStorage!);
  }

  onCardSelected(data: CardSelected) {
    const { idUser, cardSelected } = data;
    const index = this.players.findIndex((player) => player._id == idUser);
    this.players[index].selected_card = cardSelected;
    this.activateCountingOrReveal();
  }

  revealCards() {
    const cards = this.players.map((player) => player.selected_card);
    let values: any = {};
    cards.map((value) => {
      if (value != -3) {
        values[`${value}`] = (values[`${value}`] || 0) + 1;
      }
    });

    const result = Object.entries(values).map(([value, amount]) => ({
      value,
      amount,
    }));

    this.socketService.emit('reveal-cards', result);
    this.cardsSelected = result;
    this.isRevealable = false;
    this.isAvaliableToRestart = true;
  }

  restart() {
    const config = {
      data: this.players,
      disableClose: true,
      panelClass: 'admin-modal',
    };
    this.dialog
      .open(AdminModalComponent, config)
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((idUser: string) => {
        this.socketService.emit('restart', idUser);
        this.isAvaliableToRestart = false;
        this.isRevealable = false;
        this.cardsSelected = [];
        this.countingVotes = false;
        this.players = this.players.map((player) => {
          player.selected_card = -3;
          if (player._id == idUser) {
            player.is_owner = true;
          } else {
            player.is_owner = false;
          }
          this.user._id == idUser
            ? (this.user.is_owner = true)
            : (this.user.is_owner = false);
          return player;
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
