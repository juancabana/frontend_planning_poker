import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router)
  const authService = inject(AuthService)

  const userInfo = await authService.currentAuthenticatedUser()

    if (!userInfo) {
      router.navigate(['/login']);
    }

    return true;
};
