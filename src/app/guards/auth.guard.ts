import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }

  async canActivate(): Promise<boolean> {

    const isVerified = !!(await this.authService.getSession());

    // If false, redirect to sign in page
    if (!isVerified) {
      this.router.navigate(['/signin']);
    }

    return isVerified;
  }
}