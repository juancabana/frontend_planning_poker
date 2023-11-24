import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  constructor() {}
  setupSocketConnection(room: any) {
    const options = () => {
      const user: any = localStorage.getItem('user');
      const userParsed = JSON.parse(user);
      if (!user) {
        return {
          query: {
            nameRoom: room.tittle,
          },
        };
      }
      return {
        query: {
          nameRoom: room.tittle,
          idUser: userParsed._id,
          user,
        },
      };
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
    this.socket.disconnect(this.socket);
  }
}
