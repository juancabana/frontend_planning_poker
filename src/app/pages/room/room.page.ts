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

  public room!: Room;
  public userHost!: User;

  public players: User[] = [];
  public cardsSelected: any[] = [];
  public isRevealable: Boolean = false;
  public isAvaliableToRestart: Boolean = false;
  public revealCardsOrRestartText: string = '';
  public countingVotes: Boolean = false;

  constructor(
    public socketService: WebSocketService,
    private readonly httpService: HttpService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.room = this.httpService.getRoom()!;
    this.socketService.setupSocketConnection(this.room);
    this.createUser();
  }

  createUser(): void {
    this.openCreateUserDialog().afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      this.userHost = this.getUser();
      this.listenNewUser();
      this.getPlayersInCache();
      this.listenCardRevealed();
      this.listenRestartGame();
    });
  }

  openCreateUserDialog(): MatDialogRef<UserModalComponent> {
    return this.dialog.open(UserModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: this.room._id },
    });
  }

  allPlayersSelectedCard(): boolean {
    const usersTypePlayers = this.players.filter(
      ({ visualization }) => visualization == 'player'
    );
    return usersTypePlayers.every(
      (player) => player.selected_card?.value! > -3
    );
  }

  activateCountingOrReveal(): void {
    if (!this.allPlayersSelectedCard()) return;
    if (this.userHost.is_owner) {
      this.isRevealable = true;
      this.revealCardsOrRestartText = 'Revelar cartas';
      return;
    }
    this.countingVotes = true;
  }

  listenNewUser(): void {
    this.socketService.listenNewUser().pipe(takeUntil(this.unsubscribe$)).subscribe((data: User[]) => {
      if (!this.exists(this.userHost)) {
        this.players = [this.userHost, ...data];
        this.setFirstPosition();
      } else {
        this.players = [...data];
        this.setFirstPosition();
      }
      this.activateCountingOrReveal();
    });
  }

  listenRestartGame(): void {
    this.socketService.listenRestartGame().pipe(takeUntil(this.unsubscribe$)).subscribe((players) => {
      this.players = players;
      players.map((player) => {
        player._id == this.userHost._id
          ? (this.userHost.is_owner = player.is_owner)
          : false;
      });

      this.isAvaliableToRestart = false;
      this.isRevealable = false;
      this.revealCardsOrRestartText = '';
      this.cardsSelected = [];
      this.countingVotes = false;
    });
  }

  listenCardRevealed(): void {
    this.socketService.listenCardRevealed().pipe(takeUntil(this.unsubscribe$)).subscribe((data: CardRevealed[]) => {
      this.cardsSelected = data;
      this.countingVotes = false;
    });
  }

  getPlayersInCache(): void {
    this.httpService.getPlayers(this.room._id!).subscribe(
     (cachedPlayers) => {
        if (!cachedPlayers.some((user: User) => user._id == this.userHost._id)) {
          this.players = [this.userHost, ...cachedPlayers];
          this.setFirstPosition();
          return
        }
        this.players = cachedPlayers;
        this.setFirstPosition();
      },
    );
  }

  setFirstPosition(): void {
    let userIndex = this.players.findIndex(
      (player) => this.userHost._id === player._id
    );
    if (userIndex !== -1) {
      let user = this.players.splice(userIndex, 1)[0];
      this.players.unshift(user);
    }
  }

  exists = (userToEvaluate: User): boolean =>
    this.players.some((element) => element._id == userToEvaluate._id);

  getUser() {
    const userInLocalStorage = localStorage.getItem('user');
    return JSON.parse(userInLocalStorage!);
  }

  onCardSelected(data: CardSelected): void {
    const { idUser, cardSelected } = data;
    const index = this.players.findIndex((player) => player._id == idUser);
    this.players[index].selected_card = cardSelected;
    this.activateCountingOrReveal();
  }

  revealCards(): void {
    const players = this.players.filter(player => player.visualization == 'player');
    const cards = players.map((player) => player.selected_card?.value);
    let values: any = {};
    cards.forEach((value) => {
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
    this.revealCardsOrRestartText = 'Nueva votación';
  }

  restart(): void {
    const config = {
      data: this.players,
      disableClose: true,
      panelClass: 'admin-modal',
    };
    this.dialog.open(AdminModalComponent, config).afterClosed().pipe(takeUntil(this.unsubscribe$)).subscribe((idUser: string) => {
      this.socketService.emit('restart', idUser);
      this.isAvaliableToRestart = false;
      this.isRevealable = false;
      this.revealCardsOrRestartText = '';
      this.cardsSelected = [];
      this.countingVotes = false;
      delete this.userHost.selected_card
      this.userHost.is_owner = idUser == this.userHost._id
      this.players.forEach((player) => {
        delete player.selected_card
        player.is_owner = player._id == idUser;
      });
    });
  }

  revealCardsOrRestart(): void {
    this.isAvaliableToRestart ? this.restart() : this.revealCards();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
