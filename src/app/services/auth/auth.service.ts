import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';

interface TokenResponse {
  access: string;
  status: number;
}

interface create {
  refresh: string;
  access: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAlertShowing = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertController: AlertController
  ) {}

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
      await this.showVerificationFailedAlert();
      return false;
    }
  }

  // handles the token and refreshes it if needed
  async refreshToken() {
    // get the refresh token
    const refresh_token = this.getRefreshToken();
    // if there is no refresh token
    if (!refresh_token) {
      return false;
    }
    try {
      const response = await lastValueFrom(
        this.http.post<TokenResponse>(
          'https://portal.toverland.nl/auth/jwt/refresh/',
          { refresh: refresh_token },
          { observe: 'response' }
        )
      );

      if (
        response.status >= 200 &&
        response.status <= 299 &&
        response.body &&
        response.body.access
      ) {
        this.saveToken(response.body.access);
        return true;
      }
      console.error('Error refreshing token:', response.body);
      return false;
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false;
    }
  }

  // checks if the token is still valid
  async verifyToken() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        const refreshResult = await this.refreshToken();
        if (!refreshResult) {
          await this.showVerificationFailedAlert();
          return false;
        }
        return refreshResult;
      } else {
        const observable = this.http.post(
          'https://portal.toverland.nl/auth/jwt/verify/',
          { token },
          { observe: 'response' }
        );
        const response = await lastValueFrom(observable);
        if (response.status >= 200 && response.status <= 299) {
          return true;
        } else {
          const refreshResult = await this.refreshToken();
          if (!refreshResult) {
            await this.showVerificationFailedAlert();
            return false;
          }
          return refreshResult;
        }
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      await this.showVerificationFailedAlert();
      return false;
    }
  }

  // Sign in
  async signIn(username: string, password: string): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.http.post<any>(
          'https://portal.toverland.nl/auth/jwt/create/',
          { username, password },
          { observe: 'response' }
        )
      );

      if (response.status >= 200 && response.status <= 299 && response.body) {
        this.saveToken(response.body.access);
        this.saveRefreshToken(response.body.refresh);
        this.isAuthenticated.next(true);
        this.router.navigateByUrl('/home');
        return true;
      } else {
        console.error('Error logging in', response.body);
        this.isAuthenticated.next(false);
        return false;
      }
    } catch (error) {
      console.error('Error logging in', error);
      this.isAuthenticated.next(false);
      return false;
    }
  }

  // Sign out
  async signOut() {
    localStorage.clear();
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/signin');
  }

  // Token storage
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

  // Alert
  async showVerificationFailedAlert() {
    if (this.isAlertShowing) {
      return; // Don't show another alert if one is already showing
    }

    this.isAlertShowing = true;
    const alert = await this.alertController.create({
      header: 'Verificatie mislukt',
      message: 'Je sessie is verlopen. Log opnieuw in om door te gaan.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.signOut();
            this.isAlertShowing = false;
          }
        }
      ]
    });
  
    await alert.present();

    // Also handle if the alert is dismissed by clicking outside
    await alert.onDidDismiss();
    this.isAlertShowing = false;
  }
}
