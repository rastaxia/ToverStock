import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    
    const isVerified = !!(await this.authService.getSession());

    // If true, redirect to home page
    if (isVerified) {
        // if user has seen the welcome page, redirect to home 
        // else show welcome
      this.router.navigate(['/home']);
    }

    return !isVerified;
  }
}
