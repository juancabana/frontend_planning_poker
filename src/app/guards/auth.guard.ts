import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { currentConfig } from '../aws.config';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const token = localStorage.getItem(`CognitoIdentityServiceProvider.${currentConfig.Auth?.Cognito.userPoolClientId}.92085648-131b-40f1-807f-49f5c293c0be.accessToken`);
    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    try {
      // Decodifica el token. Si el token no es válido, jwt_decode lanzará un error
      jwtDecode(token);
      return true;
    } catch (error) {
      router.navigate(['/login']);
      return false;
    }
};
