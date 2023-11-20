import { Component } from '@angular/core';
import { WebSocketService } from '../../services/web-socket/web-socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent {
  constructor(
    private socketService: WebSocketService,
    private route: ActivatedRoute
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
    this.socketService.setupSocketConnection();
    this.route.params.subscribe((params) => {
      // `params` es un objeto que contiene los parámetros de la URL
      console.log(params);
      // this.router.navigateByUrl(`/${data._id}`)
    });
  }
}
