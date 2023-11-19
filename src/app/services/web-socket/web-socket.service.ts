import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  constructor() {}
  setupSocketConnection() {
    this.socket = io('localhost:3000');
  }
}
