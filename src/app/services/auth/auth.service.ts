import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';
  refresh_token = '';

  
  // Get user session
  async getSession() {
    // ...
    // put auth session here
    // ...
    return false;
    // return session;
  }

  // handles the token and refreshes it if needed
  async refreshToken(){ 
    // if refresh token is still valid make a new token
  }

  // checks if the token is still valid
  async verifyToken() {
    console.log(this.token);
    try {
      return this.http.post('https://portal.toverland.nl/auth/jwt/verify/', { token: this.token }, { observe: 'response' }).toPromise().then((res: any) => {
        console.log(res);
      });
    } catch (error) {
      console.error('Error verifying token' + error);
      
    }
  }


  // Sign in
  async signIn(username: string, password: string) {
    return this.http.post('https://portal.toverland.nl/auth/jwt/create/', { username, password }, { observe: 'response' }).toPromise().then((res: any) => {
      const statusCode = res.status;
      try {
        if (statusCode <= 200 || statusCode <= 299) {
          this.token = res.body.access;
          this.refresh_token = res.body.refresh;
          this.isAuthenticated.next(true);
          this.router.navigateByUrl('/home');
        }
        else {
          this.isAuthenticated.next(false);
          console.error('Error logging in' + res.body);
        }
      } catch (error) {
        console.error('Error logging in' + error);
        this.isAuthenticated.next(false);
      }
      }
    );
  }

  // Sign out
  async signOut() {

    // ...
    // clean subscriptions / local storage etc. here
    // ...

    // Navigate to sign-in
    this.router.navigateByUrl('/signin');
  }
}
