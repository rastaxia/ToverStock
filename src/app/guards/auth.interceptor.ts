import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Track if a refresh is already in progress to prevent multiple refresh calls
  private isRefreshing = false;
  // BehaviorSubject to queue requests while refreshing token
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    if (token) {
      request = this.addToken(request, token);
    }

    // Handle the request and catch any errors
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        }
        return throwError(() => error);
      })
    );
  } 

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `JWT ${token}`
      }
    });
  }
  
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return new Observable<HttpEvent<any>>(observer => {
        this.authService.refreshToken().then(
          success => {
            this.isRefreshing = false;
            if (success) {
              const token = this.authService.getToken();
              if (token) {
                this.refreshTokenSubject.next(token);
                observer.next();
                observer.complete();
                // Return the retried request with new token
                return next.handle(this.addToken(request, token)).subscribe(observer);
              } else {
                // If refresh fails, redirect to login
                this.authService.signOut();
                observer.error('Token refresh failed');
              }
            } else {
              // If refresh fails, redirect to login
              this.authService.signOut();
              observer.error('Token refresh failed');
            }
          },
          error => {
            this.isRefreshing = false;
            this.authService.signOut();
            observer.error(error);
          }
        );
      });
    } else {
      // For subsequent requests that fail while refresh is in progress
      return this.refreshTokenSubject.pipe(
        // Wait until refreshTokenSubject has a non-null value
        filter(token => token != null),
        // Take only the first emission
        take(1),
        // Use the new token to retry the request
        switchMap(token => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }
};
