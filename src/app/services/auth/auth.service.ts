import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { jwtDecode } from 'jwt-decode';

interface TokenResponse {
  access: string;
  status: number;
}

interface create {
  refresh: string;
  access: string;
}

interface JwtPayload {
  exp: number;
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
    const refresh_token = this.getRefreshToken();
    if (!refresh_token) {
      return false; // No refresh token available
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
        return true; // Successfully refreshed token
      }
      console.error('Error refreshing token:', response.body);
      return false; // Refresh token failed
    } catch (error) {
      console.error('Error refreshing token:', error);
      return false; // Error occurred during refresh
    }
  }


  
// checks if the token is still valid
async verifyToken() {
  const token = localStorage.getItem('token');
  if (!token) {
    await this.showVerificationFailedAlert();
    return false;
  }
  
  try {
    const response = await lastValueFrom(
      this.http.post(
        'https://portal.toverland.nl/auth/jwt/verify/',
        { token },
        { observe: 'response' }
      )
    );
    
    if (response.status >= 200 && response.status < 300) {
      return true;
    }
  } catch (error) {
    console.error('Token verificatie mislukt:', error);
    // Probeer de token te vernieuwen voordat je uitlogt
    const refreshSuccess = await this.refreshToken();
    if (refreshSuccess) {
      return true;
    }
  }
  
  // Als zowel verificatie als refresh mislukt zijn:
  await this.showVerificationFailedAlert();
  return false;
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
        localStorage.removeItem('verificationAlertShown');
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
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('selectedAction');
    localStorage.removeItem('selectedLocation');
    this.isAuthenticated.next(false);
    await this.router.navigateByUrl('/signin');
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
    // Check if we've shown the alert in this session
    const alertShownTimestamp = localStorage.getItem('verificationAlertShown');
    const now = Date.now();
    
    // If we've shown the alert in the last 5 minutes, don't show it again
    if (alertShownTimestamp && (now - parseInt(alertShownTimestamp)) < 300000) {
      return;
    }

    if (this.isAlertShowing) {
      return;
    }

    this.isAlertShowing = true;
    localStorage.setItem('verificationAlertShown', now.toString());
    
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
    await alert.onDidDismiss();
    this.isAlertShowing = false;
  }
}
