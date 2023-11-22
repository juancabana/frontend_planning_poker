import { Component } from '@angular/core';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http-service/http-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserModalComponent } from 'src/app/components/user-modal/user-modal.component';

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

  players = [
    { name: 'David', is_viewer: true },
    { name: 'Jordi', is_viewer: false },
    { name: 'Marc', is_viewer: false },
    { name: 'Javier', is_viewer: true },
    { name: 'Pau', is_viewer: false },
    { name: 'Pere', is_viewer: false },
    { name: 'Pol', is_viewer: false },
    { name: 'Jorge', is_viewer: true },
    { name: 'Ramon', is_viewer: false },
    { name: 'Raul', is_viewer: false },
  ];
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      // `params` es un objeto que contiene los parámetros de la URL
      (this.id_room = params.id_room),
        this.httpService.findRoomById(params.id_room).subscribe({
          next: (data) => {
            this.socketService.setupSocketConnection();
          },
          error: (error) => {
            console.log(error);
            // redireccionar a la pagina de error
            this.router.navigateByUrl('**');
          },
        });
      // Find user in local storage
      this.findUserInLocalStorage();
    });
  }

  findUserInLocalStorage() {
    if (!localStorage.getItem('user')) {
      this.openDialog();
    } else {
      // Si hay un usuario guardado, enviarlo al servidor
      console.log('Ya hay un usuario registrado');
      // this.socketService.sendUserToServer(localStorage.getItem('user'));
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      hasBackdrop: true,
      width: '500px',
      panelClass: 'user-modal',
      backdropClass: 'blur-backdrop',
      disableClose: true,
      data: { room_id: this.id_room },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
