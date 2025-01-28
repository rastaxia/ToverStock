import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  // Auth state
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  // Token checks if you have rights
  token = '';
  // Refresh token for when the token is expired
  refresh_token = '';

  // Get user session
  async getSession() {
    // Check if token is valid
    const isTokenValid = await this.verifyToken();
    if (isTokenValid) {
      this.isAuthenticated.next(true);
      return true;
    } else {
      return this.isAuthenticated.value;
    }
  }

  // handles the token and refreshes it if needed
  async refreshToken() {
    try {
      
      
    } catch (error) {
      console.error('Error refreshing token' + error);
    }

  }

  // checks if the token is still valid
  async verifyToken() {
    try {
      const res = await this.http
        .post(
          'https://portal.toverland.nl/auth/jwt/verify/',
          { token: this.token || localStorage.getItem('token') },
          { observe: 'response' }
        )
        .toPromise();
      return res;
    } catch (error) {
      console.error('Error verifying token' + error);
      return false;
    }
  }

  // Sign in
  async signIn(username: string, password: string) {
    return this.http
      .post(
        'https://portal.toverland.nl/auth/jwt/create/',
        { username, password },
        { observe: 'response' }
      )
      .toPromise()
      .then((res: any) => {
        const statusCode = res.status;
        try {
          if (statusCode <= 200 || statusCode <= 299) {
            this.saveToken(res.body.access);
            this.token = res.body.access;
            this.saveRefreshToken(res.body.refresh);
            this.refresh_token = res.body.refresh;
            this.isAuthenticated.next(true);
            this.router.navigateByUrl('/home');
          } else {
            this.isAuthenticated.next(false);
            console.error('Error logging in' + res.body);
          }
        } catch (error) {
          console.error('Error logging in' + error);
          this.isAuthenticated.next(false);
        }
      });
  }

  // Sign out
  async signOut() {
    localStorage.clear();
    this.isAuthenticated.next(false);
    // Navigate to sign-in
    this.router.navigateByUrl('/signin');
  }

  saveToken(token: string) {
    return localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  saveRefreshToken(refresh_token: string) {
    return localStorage.setItem('refresh_token', refresh_token);
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }
}
