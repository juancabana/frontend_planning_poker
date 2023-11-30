import { Component } from '@angular/core';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal.component';
// import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent {
  id_room: string = '';
  user: any;
  players: any[] = [];
  room: any = {};
  is_revealable_button_visible: Boolean = false;
  cards_selected: any[] = [];

  constructor(
    private socketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private dialog: MatDialog
  ) {}
  // Saber el parametro de la url

  async ngOnInit() {
    // Get params from url
    this.route.params.subscribe((params: any) => {
      this.id_room = params.id_room;
    });
    // Find room by id
    const room = await this.httpService.findRoomById(this.id_room);
    if (room == null) {
      this.router.navigateByUrl('**');
    }
    this.room = room;

    // Setup socket connection
    this.socketService.setupSocketConnection(this.room);
    console.log('Después de setupSocketConnection');

    await this.findUserInLocalStorage();

    this.socketService.listenNewUser().subscribe((data: any) => {
      // console.log('Se ha CREADO un nuevo usuario', data);
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
        // Activa la propiedad reve
        this.is_revealable_button_visible = true;
      }
    });

    const playersToCache = await this.httpService.getPlayers(this.id_room);

    this.players = [this.user, ...playersToCache];
    // if (!this.exists(this.user)) {
    if (!playersToCache.some((element: any) => element._id == this.user._id)) {
      this.players = [this.user, ...playersToCache];
      this.setFirstPosition();
    } else {
      this.players = playersToCache;
      this.setFirstPosition();
    }

    // Socket services

    this.socketService.listenDisconnect().subscribe((data: any) => {
      console.log('Se ha DESCONECTADO un nuevo usuario');
      // console.log(data);

      // this.players = data;
    });
    this.socketService.listenConnect().subscribe((data: any) => {
      console.log('Se ha RECONECTADO un nuevo usuario');
      this.players = data;
    });
    this.socketService.listenCardRevealed().subscribe((data: any) => {
      this.cards_selected = data;
    });
    // },
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
  exists = (userToEvaluate: any) =>
    this.players.some((element) => element._id == userToEvaluate._id);
  isConnected = (userToEvaluate: any) => {
    return userToEvaluate.is_connected == true;
  };

  async findUserInLocalStorage() {
    if (!localStorage.getItem('user')) {
      // Abrir el modal y esperar a que se cierre
      const dialogRef: MatDialogRef<UserModalComponent> = this.openDialog();
      await dialogRef.afterClosed().toPromise();
      const user = JSON.parse(localStorage.getItem('user')!);
      this.user = user;
    } else {
      const user = JSON.parse(localStorage.getItem('user')!);
      this.user = user;
    }
  }

  openDialog(): MatDialogRef<UserModalComponent> {
    const dialogRef = this.dialog.open(UserModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: this.id_room },
    });
    dialogRef.afterClosed().subscribe((result) => {});
    return dialogRef;
  }
  onCardSelected(data: any) {
    const { idUser, cardSelected } = data;
    // Encontrar el usuario en el array de jugadores y actualizar su estado
    const index = this.players.findIndex((player) => player._id == idUser);
    this.players[index].selected_card = cardSelected;
    // console.log(index);
  }
  RevealCards() {
    // Recorre el array de jugadores y devuelve un array con las cartas seleccionadas
    const cards = this.players.map((player) => player.selected_card);
    // Devuelve un array con los valores y la cantidad de las cartas seleccionadas
    const cardsSelected = cards.reduce((acc, card) => {
      acc[card] = (acc[card] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(cardsSelected).map(([value, amount]) => ({
      value,
      amount,
    }));

    // console.log(result);
    this.socketService.emit('reveal-cards', result);
    this.cards_selected = result;
  }
}
