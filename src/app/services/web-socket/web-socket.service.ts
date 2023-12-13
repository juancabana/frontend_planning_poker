import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment as env } from './../../../environments/environment';
import { Socket } from 'socket.io-client';

import { User } from './../../interfaces/user.interface';
import { Card } from './../../interfaces/card.interface';
import { Room } from './../../interfaces/room.interface';
import { CardRevealed } from './../../interfaces/card-revealed.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket!: Socket;
  private room!: Room;
  private user: User;
  constructor() {
    const user = localStorage.getItem('user');
  this.user = user ? JSON.parse(user) : null;
  }
  setupSocketConnection(room: Room, user?: User) {
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

  onEvent<T>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
      });
    });
  }
  emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }

  listenNewUser(): Observable<User[]> {
    return this.onEvent<User[]>('userCreated');
  }

  listenCardSelected(): Observable<Card[]> {
    return this.onEvent<Card[]>('cardSelected');
  }

  listenCardRevealed(): Observable<CardRevealed[]> {
    return this.onEvent<CardRevealed[]>('reveal-cards');
  }

  listenRestartGame(): Observable<User[]> {
    return this.onEvent<User[]>('restart');
  }
}
