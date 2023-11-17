import { Component } from '@angular/core';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.sass'],
})
export class RoomComponent {
  constructor(private socketService: WebSocketService) {}
  ngOnInit() {
    this.socketService.setupSocketConnection();
  }
}
