import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { roomExistsGuard } from './room-exists.guard';
import { HttpService } from '../services/http-service/http-service.service';
import { Room } from '../interfaces/room.interface';

describe('roomExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roomExistsGuard(...guardParameters));

  let router: Router;
  let service: object


  beforeEach(() => {
    TestBed.configureTestingModule({});
    router = TestBed.inject(Router);
    service = {
      findRoomById: jest.fn(),
      setRoom: jest.fn()
    };
  });

  // roomExistsGuard
  it('roomExistsGuard: should return true if room exists', () => {
    const room: Room = { _id: '123', tittle: 'Test Room', averageScore: -1, owner: '123', players: [] };


  });
});
