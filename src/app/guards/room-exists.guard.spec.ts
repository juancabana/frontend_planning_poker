import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

import { roomExistsGuard } from './room-exists.guard';
import { Room } from '../interfaces/room.interface';

describe('roomExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roomExistsGuard(...guardParameters));
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  // roomExistsGuard
  it('roomExistsGuard: should return true if room exists', () => {
    const mockRoom: Room = { _id: '123', tittle: 'Test Room', averageScore: -1, owner: '123', players: [] };
  });
});
