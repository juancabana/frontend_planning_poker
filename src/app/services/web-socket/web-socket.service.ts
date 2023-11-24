import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

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
  setupSocketConnection(room: any) {
    this.room = room;
    const options = () => {
      if (!this.user) {
        console.log('!this.user');
        return {
          query: {
            nameRoom: this.room.tittle,
            user: localStorage.getItem('user'),
          },
        };
      } else {
        console.log('else');
        return {
          query: {
            nameRoom: this.room.tittle,
            user: localStorage.getItem('user'),
            is_registered: true,
          },
        };
      }
    };
    this.socket = io(
      // 'https://planning-pokerservice.onrender.com'
      'localhost:3000',
      options()
    );

    // Escucha el evento de creación de usuario
    this.socket.on('usuarioCreado', (usuario: any) => {
      console.log('Usuario creado:', usuario);
    });
  }
  getID(): string {
    return this.socket.id;
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
  disconnect(): void {
    // localStorage.removeItem('user');
    const user = localStorage.getItem('user');
    this.socket.disconnect(user);
  }
}
