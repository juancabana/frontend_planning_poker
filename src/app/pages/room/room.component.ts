import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { HttpService } from './../../services/http-service/http-service.service';

import { UserModalComponent } from './../../components/templates/user-modal/user-modal.component';
import { AdminModalComponent } from './../../components/templates/admin-modal/admin-modal.component';

import { User } from './../../interfaces/user.interface';
import { Room } from './../../interfaces/room.interface';
import { CardRevealed } from './../../interfaces/card-revealed.interface';
import { CardSelected } from './../../interfaces/card-selected.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent implements OnInit, OnDestroy {
  public idRoom: string = '';
  private createUserSubscription: Subscription = new Subscription();
  private routeSuscription: Subscription = new Subscription();
  private listenNewUserSubscription: Subscription = new Subscription();
  private listenRevealedCardsSubscription: Subscription = new Subscription();
  private listenRestartGameSubscription: Subscription = new Subscription();

  public user!: User;
  public players: User[] = [];
  public cardsSelected: any[] = [];
  public room!: Room;
  public isRevealable: Boolean = false;
  public isAvaliableToRestart: Boolean = false;
  public countingVotes: Boolean = false;
  public ngZone: NgZone = new NgZone({});

  constructor(
    private readonly socketService: WebSocketService,
    public readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpService: HttpService,
    public  dialog: MatDialog
  ) {}

  ngOnInit() {
    this.routeSuscription = this.route.params.subscribe((params) => {
      this.idRoom = params['id_room'];
      this.validateRoom();
    });

    this.createUserSubscription = this.createUser()
      .afterClosed()
      .subscribe(() => {
        const user = this.getUser();
        this.user = user;
        this.listenNewUser();
        this.getPlayersInCache();
        this.listenCardRevealed();
        this.listenRestartGame();
      });
  }

  createUser(): MatDialogRef<UserModalComponent> {
    const dialogRef = this.dialog.open(UserModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: this.idRoom },
    });
    return dialogRef;
  }

  validateRoom() {
    this.httpService
      .findRoomById(this.idRoom)
      .subscribe(
        (response) => {
          this.room = response;
          this.socketService.setupSocketConnection(this.room);
        },
        () => {
          this.ngZone.run(() => {
            this.router.navigateByUrl('**');
            return;
          });
        }
      );
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
    this.listenNewUserSubscription = this.socketService
      .listenNewUser()
      .subscribe(
        (data: User[]) => {
          if (!this.exists(this.user)) {
            this.players = [this.user, ...data];
            this.setFirstPosition();
          } else {
            this.players = data;
            this.setFirstPosition();
          }
          // Active Button Reveal or Counting Votes
          this.activateCountingOrReveal();
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }

  listenRestartGame() {
    this.listenRestartGameSubscription = this.socketService
      .listenRestartGame()
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
    this.listenRevealedCardsSubscription = this.socketService
      .listenCardRevealed()
      .subscribe((data: CardRevealed[]) => {
        this.cardsSelected = data;
        this.countingVotes = false;
      });
  }

  getPlayersInCache() {
    this.httpService
      .getPlayers(this.idRoom)
      .subscribe((cachedPlayers) => {
        this.players = [this.user, ...cachedPlayers];
        if (
          !cachedPlayers.some((element: User) => element._id == this.user._id)
        ) {
          this.players = [this.user, ...cachedPlayers];
          this.setFirstPosition();
        } else {
          this.players = cachedPlayers;
          this.setFirstPosition();
        }
      });
  }

  setFirstPosition() {
    let userIndex = this.players.findIndex(
      (player) => player._id === this.user._id
    );
    if (userIndex !== -1) {
      // Remove user from array
      let user = this.players.splice(userIndex, 1)[0];
      // Insert user in first position
      this.players.unshift(user);
    }
  }

  exists = (userToEvaluate: User) =>
    this.players.some((element) => element._id == userToEvaluate._id);

  getUser() {
    const userInLocalStorage = localStorage.getItem('user');
    return userInLocalStorage ? JSON.parse(userInLocalStorage) : null;
  }

  onCardSelected(data: CardSelected) {
    const { idUser, cardSelected } = data;
    // find index of object with id
    const index = this.players.findIndex((player) => player._id == idUser);
    this.players[index].selected_card = cardSelected;
    this.activateCountingOrReveal();
  }

  revealCards() {
    const cards = this.players.map((player) => player.selected_card);
    // return the number of times each value appears in the array
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
    this.routeSuscription.unsubscribe();
    this.listenNewUserSubscription.unsubscribe();
    this.listenRevealedCardsSubscription.unsubscribe();
    this.listenRestartGameSubscription.unsubscribe();
    this.createUserSubscription.unsubscribe();
  }
}
