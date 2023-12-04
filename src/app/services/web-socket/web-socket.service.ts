import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment as env } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  private room: any;
  private user: any;
  constructor() {
    this.user = localStorage.getItem('user');
  }
  setupSocketConnection(room: any, user?: any) {
    this.room = room;
    const options = () => {
      if (!this.user) {
        return {
          query: {
            nameRoom: this.room.tittle,
            user: localStorage.getItem('user'),
          },
        };
      } else {
        return {
          query: {
            nameRoom: this.room.tittle,
            user: localStorage.getItem('user'),
            is_registered: true,
          },
        };
      }
    };
    this.socket = io(env.urlSocket, options());
  }

  // Método para escuchar eventos del servidor
  onEvent(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }
  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }
  listenNewUser(): Observable<any> {
    return this.onEvent('userCreated');
  }
  listenDisconnect(): Observable<any> {
    return this.onEvent('userDisconected');
  }
  listenConnect(): Observable<any> {
    return this.onEvent('userConnected');
  }
  listenCardSelected(): Observable<any> {
    return this.onEvent('cardSelected');
  }
  listenCardRevealed(): Observable<any> {
    return this.onEvent('reveal-cards');
  }
  disconnect(): void {
    // localStorage.removeItem('user');
    // const user = localStorage.getItem('user');
    this.socket.disconnect();
  }
}
