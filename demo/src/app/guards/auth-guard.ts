import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    if (state.url.includes('/manager')) {
      router.navigate(['/manager/login']);
    } else {
      router.navigate(['/admin/login']);
    }
    return false;
  }
};
