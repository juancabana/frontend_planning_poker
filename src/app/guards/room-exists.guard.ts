import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  UrlTree,
  RouterStateSnapshot,
} from '@angular/router';
import { of, Observable, Subject } from 'rxjs';
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

  let result: Subject<boolean | UrlTree> = new Subject();

  service
    .findRoomById(idRoom)
    .pipe(
      map((room: Room) => {
        service.setRoom(room);
        return true;
      }),
      catchError(() => {
        localStorage.removeItem('user');
        router.navigateByUrl('**');
        return of(false);
      })
    )
    .subscribe((res) => result.next(res));
  return result.asObservable();
};
