import { Component } from '@angular/core';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal.component';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent {
  id_room: string = '';
  user: any = false;
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

    if (!room._id) {
      this.router.navigateByUrl('**');
    }
    this.room = room;

    this.socketService.setupSocketConnection(this.room);

    await this.findUserInLocalStorage();
    console.log('Después de la función del modal');

    const activePlayers = this.room.players.filter(
      (player: any) => this.isConnected(player) == true
    );
    console.log('Después de activePlayers');

    if (!this.exists(this.user) && this.isConnected(this.user)) {
      this.players = [this.user, ...activePlayers];
      console.log('No existe el usuario');
    } else {
      // Usuario ya existe
      this.players = activePlayers;
    }

    // Socket services
    this.socketService.listenNewUser().subscribe((data: any) => {
      console.log('Nuevo usuario:', data);
      if (!this.exists(data)) {
        this.players.push(data);
      }
    });
    this.socketService.listenDisconnect().subscribe((data: any) => {
      const user = JSON.parse(data);
      console.log(user);
      // Busco el jugador con el ID recibido
      const playerIndex = this.players.findIndex(
        (player) => player._id == user._id
      );
      const newPlayers = [...this.players];

      // Si el jugador existe, elimínalo
      if (playerIndex !== -1) {
        newPlayers.splice(playerIndex, 1);
      }
      this.players = newPlayers;
    });
    this.socketService.listenConnect().subscribe((data: any) => {
      const user = JSON.parse(data);
      if (!this.exists(user)) {
        this.players.push({ ...user, is_connected: true });
      }
    });
    // },
  }

  exists = (userToEvaluate: any) =>
    this.players.some((element) => element._id == userToEvaluate._id);
  isConnected = (userToEvaluate: any) => {
    return userToEvaluate.is_connected == true;
  };

  addPlayer(player: any) {
    // Verificar si el usuario está activo
    if (player.is_connected) {
      // Verificar si el usuario es nuevo
      if (!this.exists(player)) {
        // Verificar si el usuario es el mismo
        if (player._id == JSON.parse(localStorage.getItem('user')!)._id) {
          // console.log('Es el mismo usuario');

          this.players = [...this.players, player];
        } else {
          // console.log('Es un usuario nuevo');
          this.players.push(player);
        }
      }
      return;
    }
  }

  async findUserInLocalStorage() {
    if (!localStorage.getItem('user')) {
      // Abrir el modal y esperar a que se cierre
      const dialogRef: MatDialogRef<UserModalComponent> = this.openDialog();
      await dialogRef.afterClosed().toPromise();
      const user = JSON.parse(localStorage.getItem('user')!);
      this.user = user;
    } else {
      const user = JSON.parse(localStorage.getItem('user')!);
      this.addPlayer(user);
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
}
