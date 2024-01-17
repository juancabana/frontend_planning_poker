import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment as env } from './../../../environments/environment';
import { Socket } from 'socket.io-client';

import { User } from './../../interfaces/user.interface';
import { Room } from './../../interfaces/room.interface';
import { CardRevealed } from './../../interfaces/card-revealed.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  public socket!: Socket;
  public room!: Room;

  setupSocketConnection(room: Room) {
    this.room = room;
    const options = {
      query: {
        nameRoom: this.room.tittle,
        user: localStorage.getItem('user'),
      },
    };

    this.socket = io(env.urlSocket, options);
  }

  onEvent<T>(event: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(event, (data: T) => {
        observer.next(data);
      });
    });
  }

  emit(event: string, data?: unknown): void {
    this.socket.emit(event, data);
  }

  listenNewUser(): Observable<User[]> {
    return this.onEvent<User[]>('userCreated');
  }

  listenCardSelected(): Observable<User[]> {
    return this.onEvent<User[]>('cardSelected');
  }

  listenCardsRevealed(): Observable<CardRevealed[]> {
    return this.onEvent<CardRevealed[]>('reveal-cards');
  }

  listenRestartGame(): Observable<User[]> {
    return this.onEvent<User[]>('restart');
  }
}
