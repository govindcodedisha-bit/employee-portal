// core/guards/role.guard.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authservice';
import { Role } from '../models/role.enum';
import { isPlatformBrowser } from '@angular/common';

export const roleGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const allowedRoles = route.data?.['roles'] as Role[];
  const platformId = inject(PLATFORM_ID)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  const token = sessionStorage.getItem('token');
  if (!token) {
    return router.createUrlTree(['/login']);
  }

  const userRole = auth.getUserRole();

  // 1. Check login first
  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  // 2. Check role authorization
  if (userRole && allowedRoles?.includes(userRole)) {
    return true;
  }

  // 3. Unauthorized access
  return router.createUrlTree(['/unauthorized']);
};