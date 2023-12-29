import { TestBed } from '@angular/core/testing';

import { HttpService } from './http-service.service';
import { User } from 'src/app/interfaces/user.interface';
import { of } from 'rxjs';
import {
  HttpTestingController,
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { environment as env } from '../../../environments/environment';
import { Room } from 'src/app/interfaces/room.interface';
import { Card } from 'src/app/interfaces/card.interface';

describe('HttpServiceService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;
  const url: string = env.url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // getPlayers
  it('getPlayers: should call getPlayers request', () => {
    const mockPlayers: User[] = [
      {
        username: 'Juanda',
        room_id: 'id123',
        visualization: 'player',
        is_owner: true,
        _id: 'id123',
      },
      {
        username: 'Daniel',
        room_id: 'id1234',
        visualization: 'player',
        is_owner: false,
        _id: 'id123',
      },
    ];
    const mockIdRoom = 'room123';
    service.getPlayers(mockIdRoom).subscribe();
    const req = httpMock.expectOne(`${url}/room/${mockIdRoom}/players`);
    req.flush(mockPlayers);
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`${url}/room/${mockIdRoom}/players`);
  });

  // findRoomById
  it('findRoomById: should call findRoomId request', () => {
    const mockRoom: Room = {
      _id: '1234',
      tittle: 'Sprint 32',
      averageScore: -1,
      owner: 'idUser123',
      players: [],
    };
    const mockRoomId = 'roomId123';
    service.findRoomById(mockRoomId).subscribe();
    const req = httpMock.expectOne(`${url}/room/${mockRoomId}`);
    req.flush(mockRoom);
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`${url}/room/${mockRoomId}`);
  });

  // getCards
  it('getCards: should call getCards request', () => {
    const mockCards: Card[] = [
      { id: 0, value: 0, viewValue: '0', selected: false },
      { id: 1, value: 1, viewValue: '1', selected: false },
    ];
    service.getCards().subscribe();
    const req = httpMock.expectOne(`${url}/card_options`);
    req.flush(mockCards);
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`${url}/card_options`);
  });

  // createUser
  it('createUser: should call createUser request', () => {
    const mockUser: User = {
      room_id: 'id123',
      username: 'juanCabana',
      visualization: 'player',
      is_owner: false,
    };
    service.createUser(mockUser).subscribe();
    const req = httpMock.expectOne(`${url}/user`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(mockUser);
  });

  // createNewRoom
  it('createNewRoom: should call createNewRoom request', () => {
    const mockRoom: Room = {
      _id: '1234',
      tittle: 'Sprint 32',
      averageScore: -1,
      owner: 'idUser123',
      players: [],
    };
    service.createNewRoom('Sprint 32').subscribe()
    const req = httpMock.expectOne(`${url}/room`)
    req.flush(mockRoom)
    expect(req.request.url).toBe(`${url}/room`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({tittle: 'Sprint 32'})
  });
});
