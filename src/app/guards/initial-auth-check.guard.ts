import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const initialAuthCheckGuard = async () => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  const token = authService.getToken();
  if (token) {
    const isValid = await authService.verifyToken();
    if (isValid) {
      router.navigate(['/home']);
      return false;
    }
  }
  
  // If no token or invalid token, continue to signin
  return true;
}; 