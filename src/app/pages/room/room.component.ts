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
    { name: 'David' },
    { name: 'Javier' },
    { name: 'Jorge' },
    { name: 'Jordi' },
    { name: 'Marc' },
    { name: 'Pau' },
    { name: 'Pere' },
    { name: 'Pol' },
    { name: 'Ramon' },
    { name: 'Raul' },
  ];
  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      // `params` es un objeto que contiene los parámetros de la URL
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
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }
}
