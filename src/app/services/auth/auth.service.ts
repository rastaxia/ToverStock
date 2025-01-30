import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

interface TokenResponse {
  access: string;
  status: number;
}

interface create{
  refresh: string;
  access: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  // Auth state
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  // Get user session
  async getSession() {
    const verified = await this.verifyToken();

    if (verified) {
      this.isAuthenticated.next(true);
      return true;
    } else {
      this.isAuthenticated.next(false);
      this.signOut();
      return false;
    }
  }

  // handles the token and refreshes it if needed
  async refreshToken() {
    // get the refresh token
    const refresh_token = this.getRefreshToken();

    // if the refresh token exists, try to refresh the token
    if (refresh_token) {
      try {
        const observable = this.http.post<TokenResponse>(
          'https://portal.toverland.nl/auth/jwt/refresh/',
          { refresh: refresh_token },
          { observe: 'response' }
        );

        const response = await lastValueFrom(observable);

        if (response.status >= 200 && response.status <= 299) {
          // body could be null, so we need to check if it exists
          this.saveToken(response?.body?.access?? '');
          return true;
        } else {
          console.error('Error refreshing token:', response);
          return false;
        }
      } catch (error) {
        console.error('Error refreshing token:', error);
        return false;
      }
    } 
    else {
      return false;
    }
  }

  // checks if the token is still valid
  async verifyToken() {
    try {
      const token = localStorage.getItem('token');
      // if there is no token
      if (!token) {
        return this.refreshToken();
      } 
      // if there is a token
      else 
      {
        const observable = this.http.post(
          'https://portal.toverland.nl/auth/jwt/verify/',
          { token },
          { observe: 'response' }
        );
        const response = await lastValueFrom(observable);
        if (response.status >= 200 && response.status <= 299) {
          return true;
        } 
        else 
        {
          return await this.refreshToken();
        }
      }
    } catch (error) {
      return false;
    }
  }

  // Sign in
  async signIn(username: string, password: string) {

    const observable = this.http
      .post<create>(
        'https://portal.toverland.nl/auth/jwt/create/',
        { username, password },
        { observe: 'response' }
      )
 
      const res = await lastValueFrom(observable);

        try {
          if (res.status <= 200 || res.status <= 299) {
            this.saveToken(res?.body?.access?? '');
            this.saveRefreshToken(res?.body?.refresh?? '');
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
