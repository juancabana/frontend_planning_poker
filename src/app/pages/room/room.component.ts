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

    this.socketService.setupSocketConnection(this.room);
    console.log('Después de setupSocketConnection');

    // Crear usuario
    await this.findUserInLocalStorage();

    const playersToCache = await this.httpService.getPlayers(this.id_room);
    // this.players = playersToCache;
    // if (this.players.length == 0) {
    //   this.players = [this.user, ...playersToCache];
    // }
    this.players = [this.user, ...playersToCache];
    // if (!this.exists(this.user)) {
    if (!playersToCache.some((element: any) => element._id == this.user._id)) {
      this.players = [this.user, ...playersToCache];
    } else {
      this.players = playersToCache;
    }
    // {
    //   }
    //   this.players = [...playersToCache];
    // }
    // this.user = user;
    // this.players = playersToCache;
    // console.log('Después de getPlayers');

    // const activePlayers = this.room.players.filter(
    //   (player: any) => this.isConnected(player) == true
    // );
    // console.log('Después de activePlayers');

    // if (!this.exists(this.user) && this.isConnected(this.user)) {
    //   this.players = [this.user, ...activePlayers];
    //   console.log('No existe el usuario');
    // } else {
    //   // Usuario ya existe
    //   this.players = activePlayers;
    // }

    // Socket services
    this.socketService.listenNewUser().subscribe((data: any) => {
      console.log('Se ha CREADO un nuevo usuario', data);
      this.players = data;
    });
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
}
