import { Component } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent {
  constructor(private socketService: WebSocketService) {}
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
  }
}
