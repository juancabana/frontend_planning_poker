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
      console.log('Se ha CREADO un nuevo usuario', data);
      if (!this.exists(this.user)) {
        this.players = [this.user, ...data];
      } else {
        this.players = data;
      }
    });

    const playersToCache = await this.httpService.getPlayers(this.id_room);

    this.players = [this.user, ...playersToCache];
    // if (!this.exists(this.user)) {
    if (!playersToCache.some((element: any) => element._id == this.user._id)) {
      this.players = [this.user, ...playersToCache];
    } else {
      this.players = playersToCache;
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
    // },
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
  onCardSelected(idUser: any) {
    // Encontrar el usuario en el array de jugadores y actualizar su estado
    const index = this.players.findIndex((player) => player._id == idUser);
    this.players[index].selected_card = true;
    console.log(index);
  }
}
