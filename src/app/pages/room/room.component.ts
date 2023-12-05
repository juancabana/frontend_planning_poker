import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/components/templates/user-modal/user-modal.component';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Room } from 'src/app/interfaces/room.interface';
import { CardRevealed } from 'src/app/interfaces/card-revealed.interface';
import { CardSelected } from 'src/app/interfaces/card-selected.interface';
import { Card } from 'src/app/interfaces/card.interface';
import { CardCount } from './interfaces/card-count.interface';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent implements OnInit, OnDestroy {
  private idRoom: string = '';
  private routeSuscription: Subscription = new Subscription();
  private findRoomSubscription: Subscription = new Subscription();
  private getCachedPlayersSubscription: Subscription = new Subscription();
  private listenNewUserSubscription: Subscription = new Subscription();
  private listenRevealedCardsSubscription: Subscription = new Subscription();

  public user!: User ;
  public players: User[] = [];
  public room!: Room ;
  public isRevealable: Boolean = false;
  public cardsSelected: any[] = [];

  constructor(
    private readonly socketService: WebSocketService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly httpService: HttpService,
    private readonly dialog: MatDialog
  ) {}

  async ngOnInit() {
    // Get params from url
    this.routeSuscription = this.route.params.subscribe((params) => {
      this.idRoom = params['id_room'];

      // Validate if room exists
      this.validateRoom();

    });

    // Create or get user to localStorage
    await this.getOrCreateUser();

    // Listen when there is a new user
    this.listenNewUser();

    // Get users in cache
    this.getPlayersInCache();

    // Listen when cards are revealed
    this.listenCardRevealed();
  }

  async getOrCreateUser() {
    if (!this.getUser()) {
      await this.createUser();
    } else {
      const user = this.getUser();
      this.user = user;
    }
  }

  async createUser() {
    const dialogRef: MatDialogRef<UserModalComponent> = this.openDialog();
    await dialogRef.afterClosed().toPromise();
    const user = this.getUser();
    this.user = user;
  }

  validateRoom() {
    this.findRoomSubscription = this.httpService
      .findRoomById(this.idRoom)
      .subscribe(
        (response) => {
          this.room = response;
          // Set socket connection
          this.socketService.setupSocketConnection(this.room);
        },
        () => {
          this.router.navigateByUrl('**');
          return;
        }
      );
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
          // Active Button Reveal
          if (
            this.user.is_owner &&
            this.players.every((player) => player.selected_card)
          ) {
            this.isRevealable = true;
          }
        },
        (error) => {
          alert(error.error.message);
        }
      );
  }

  listenCardRevealed() {
    this.listenRevealedCardsSubscription = this.socketService
      .listenCardRevealed()
      .subscribe((data: CardRevealed[]) => {
        this.cardsSelected = data;
      });
  }

  getPlayersInCache() {
    this.getCachedPlayersSubscription = this.httpService
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
      // Eliminar el usuario del array
      let user = this.players.splice(userIndex, 1)[0];

      // Insertar el usuario en la primera posición del array
      this.players.unshift(user);
    }
  }

  exists = (userToEvaluate: User) =>
    this.players.some((element) => element._id == userToEvaluate._id);

  getUser() {
    const userInLocalStorage = localStorage.getItem('user');
    return userInLocalStorage ? JSON.parse(userInLocalStorage) : null;
  }

  openDialog(): MatDialogRef<UserModalComponent> {
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

  onCardSelected(data: CardSelected) {
    const { idUser, cardSelected } = data;
    // Encontrar el usuario en el array de jugadores y actualizar su estado
    const index = this.players.findIndex((player) => player._id == idUser);
    this.players[index].selected_card = cardSelected;
  }

  RevealCards() {
    // Recorre el array de jugadores y devuelve un array con las cartas seleccionadas
    const cards = this.players.map((player) => player.selected_card);

    // Devuelve un array con los valores y la cantidad de las cartas seleccionadas
    const cardsSelected = cards.reduce<CardCount>((acc, card) => {
      if (card !== undefined) {
        acc[card] = (acc[card] || 0) + 1;
      }
      return acc;
    }, {});

    const result = Object.entries(cardsSelected).map(([value, amount]) => ({
      value,
      amount,
    }));

    this.socketService.emit('reveal-cards', result);
    this.cardsSelected = result;
  }

  ngOnDestroy(): void {
    this.routeSuscription.unsubscribe();
    this.findRoomSubscription.unsubscribe();
    this.getCachedPlayersSubscription.unsubscribe();
    this.listenNewUserSubscription.unsubscribe();
    this.listenRevealedCardsSubscription.unsubscribe();
  }
}
