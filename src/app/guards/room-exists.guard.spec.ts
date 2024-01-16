import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterModule,
  RouterStateSnapshot,
} from '@angular/router';

import { roomExistsGuard } from './room-exists.guard';
import { Room } from '../interfaces/room.interface';
import { HttpService } from '../services/http-service/http-service.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('roomExistsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => roomExistsGuard(...guardParameters));

  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  let service: HttpService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule],
    });
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    route = { params: { id_room: 'id123' } } as unknown as ActivatedRouteSnapshot;
    state = {} as RouterStateSnapshot;
    service = TestBed.inject(HttpService);
  });

  // roomExistsGuard
  it('roomExistsGuard: should return true because room exists', () => {
    const mockRoom: Room = { _id: '123', tittle: 'Test Room', averageScore: -1, owner: '123', players: [] };
    const spy1 = jest .spyOn(service, 'findRoomById') .mockReturnValue(of(mockRoom));
    const spy2 = jest.spyOn(service, 'setRoom');
    executeGuard(route, state);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });

  it('roomExistsGuard: should redirect because room is not exists', () => {
    const spy1 = jest .spyOn(service, 'findRoomById') .mockReturnValue(throwError(new Error('Simulated error')));
    const spy2 = jest.spyOn(service, 'setRoom');
    const spy3 = jest.spyOn(router, 'navigateByUrl');
    executeGuard(route, state);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).not.toHaveBeenCalledTimes(1);
    expect(spy3).toHaveBeenCalledWith('**');
  });
});
