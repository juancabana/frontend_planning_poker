import { CanActivateFn } from '@angular/router';
import { HttpService } from '../services/http-service/http-service.service';
import { inject } from '@angular/core';

export const roomExistsGuard: CanActivateFn = (route, state) => {
  const service = inject(HttpService)
  const existsRoom: boolean = false
  service.findRoomById(route.params['id_room']).subscribe
  return true;
};
