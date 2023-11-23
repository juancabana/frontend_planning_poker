import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: any;
  constructor() {}
  setupSocketConnection(tittle: string) {
    this.socket = io('localhost:3000', {
      query: {
        nameRoom: tittle,
      },
    });
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
  getNewUser(): Observable<any> {
    return this.onEvent('createUser');
  }
}
