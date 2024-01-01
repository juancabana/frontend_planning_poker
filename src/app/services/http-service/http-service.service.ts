import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { User } from './../../interfaces/user.interface';
import { Room } from './../../interfaces/room.interface';
import { Card } from './../../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url: string = env.url;
  public room: Room | undefined

  constructor(private readonly httpClient: HttpClient) {}

  getPlayers(id: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.url}/room/${id}/players`);
  }

  findRoomById(id: string): Observable<Room> {
    return this.httpClient.get<Room>(`${this.url}/room/${id}`);
  }

  getCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(`${this.url}/card_options`);
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.url}/user`, user);
  }

  createNewRoom(tittle: string): Observable<Room> {
    return this.httpClient.post<Room>(`${this.url}/room`, { tittle });
  }

  setRoom(room: Room) {
    this.room = room
  }

  getRoom() {
    return this.room
  }
}
