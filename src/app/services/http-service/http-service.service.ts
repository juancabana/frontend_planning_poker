import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url: string = env.url;

  constructor(private readonly httpClient: HttpClient) {}

  getPlayers(id: any): Observable<any> {
    return this.httpClient.get(`${this.url}/room/${id}/players`);
  }
  findRoomById(id: string): Observable<any> {
    return this.httpClient.get(`${this.url}/room/${id}`);
  }
  getCards(): Observable<any> {
    return this.httpClient.get(`${this.url}/card_options`);
  }
  createUser(user: any): Observable<any> {
    return this.httpClient.post(`${this.url}/user`, user);
  }
  createNewRoom(tittle: string): Observable<any> {
    const response = this.httpClient.post(`${this.url}/room`, { tittle });
    return response;
  }

  findRooms(): Observable<any> {
    return this.httpClient.get(`${this.url}/room`);
  }
}
