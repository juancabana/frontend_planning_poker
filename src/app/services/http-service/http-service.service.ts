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
  async getCards(): Promise<any> {
    const res = await fetch(`${this.url}/card_options`);
    const data = await res.json();
    return data;
  }
  async createUser(user: any): Promise<any> {
    // Hacer un post con el usuario co fetch
    const res = await fetch(`${this.url}/user`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  }
  createNewRoom(tittle: string): Observable<any> {
    const response = this.httpClient.post(`${this.url}/room`, { tittle });
    return response;
  }

  findRooms(): Observable<any> {
    return this.httpClient.get(`${this.url}/room`);
  }
}
