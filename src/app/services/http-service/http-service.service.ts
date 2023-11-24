import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url: string = 'http://localhost:3000/api';
  // private url: string = 'https://planning-pokerservice.onrender.com/api';

  constructor(private httpClient: HttpClient) {}
  async getPlayers(id: any) {
    const res: any = await fetch(`${this.url}/room/${id}/players`);
    if (res.length == 0) return [];
    const data: any = await res.json();
    console.log(data);
    return data;
    // return [];
  }
  async findRoomById(id: string): Promise<any> {
    const res = await fetch(`${this.url}/room/${id}`);
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
