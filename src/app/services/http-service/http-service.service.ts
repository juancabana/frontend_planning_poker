import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private url: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  createNewRoom(tittle: string): Observable<any> {
    const response = this.httpClient.post(`${this.url}/room`, { tittle });
    return response;
  }

  findRooms(): Observable<any> {
    return this.httpClient.get(`${this.url}/room`);
  }
}
