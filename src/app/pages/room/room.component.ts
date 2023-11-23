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
  constructor(
    private socketService: WebSocketService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private dialog: MatDialog
  ) {}
  // Saber el parametro de la url

  players: any[] = [];
  async ngOnInit() {
    // Get params from url
    this.route.params.subscribe((params: any) => {
      this.id_room = params.id_room;

      const userFind: any = localStorage.getItem('user');
      const user = JSON.parse(userFind);
      if (user.room_id != this.id_room) {
        localStorage.removeItem('user');
      }
    });

    // Find room by id
    const room = await this.httpService.findRoomById(this.id_room);
    // console.log(room);

    if (!room._id) {
      this.router.navigateByUrl('**');
    }

    this.socketService.setupSocketConnection(room.tittle);

    await this.findUserInLocalStorage();
    console.log('Después de la función del modal');

    // Get user from local storage
    const user: any = localStorage.getItem('user');
    const userParsed = JSON.parse(user);

    if (!this.exists) {
      this.players = [userParsed, ...room.players];
      console.log('No existe el usuario');
    } else {
      const room = await this.httpService.findRoomById(this.id_room);
      this.players = room.players;
    }

    // Socket services
    this.socketService.getNewUser().subscribe((data: any) => {
      if (!this.exists(data)) {
        this.players.push(data);
      }
    });
    this.socketService.listenDisconnect().subscribe((id: string) => {
      // console.log(id);
      this.players = this.players.filter((player) => player._id != id);
    });
    this.socketService.listenConnect().subscribe((data: any) => {
      if (!this.exists(data)) {
        this.players.push(data);
      }
    });
    // },
  }
  exists = (userToEvaluate: any) =>
    this.players.some((element) => element._id == userToEvaluate._id);

  addPlayer(player: any) {
    this.players.push(player);
  }

  async findUserInLocalStorage() {
    if (!localStorage.getItem('user')) {
      // Abrir el modal y esperar a que se cierre
      const dialogRef: MatDialogRef<UserModalComponent> = this.openDialog();
      await dialogRef.afterClosed().toPromise();
    } else {
      const user = JSON.parse(localStorage.getItem('user')!);
      console.log('Ya hay un usuario registrado');
      // this.socketService.sendUserToServer(localStorage.getItem('user'));
      this.socketService.emit('userConnected', user);
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
    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed', result);
    });
    return dialogRef;
  }
}
