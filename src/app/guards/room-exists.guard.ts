import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  UrlTree,
  RouterStateSnapshot,
} from '@angular/router';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '../services/http-service/http-service.service';
import { Room } from '../interfaces/room.interface';

export const roomExistsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const router = inject(Router);
  const service = inject(HttpService);
  const idRoom = route.params['id_room'];

  return service.findRoomById(idRoom).pipe(
    map((room: Room) => {
      service.setRoom(room);
      return true;
    }),
    catchError(() => {
      localStorage.removeItem('user');
      router.navigateByUrl('**');
      return of(false);
    })
  );
};
