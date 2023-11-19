import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private url: string = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}

  createNewRoom(tittle: string): Observable<any> {
    return this.httpClient.post(`${this.url}/room`, { tittle });
  }
}
