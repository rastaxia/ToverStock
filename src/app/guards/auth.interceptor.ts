import { HttpErrorResponse, HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, switchMap, catchError, BehaviorSubject, filter, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

// Track if a refresh is already in progress to prevent multiple refresh calls
let isRefreshing = false;
// BehaviorSubject to queue requests while refreshing token
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export function AuthInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  
  // Skip auth for weather API
  if (request.url.includes("api/opening_times/today") || request.url.includes("api/v1/weather")) {
    return next(request); 
  }

  // Add token to request if it exists
  const token = authService.getToken();
  if (token) {
    request = addToken(request, token);
  }

  // Handle the request and catch any errors
  return next(request).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return handleError(request, next, authService);
      }
      return throwError(() => error);
    })
  );
}

function addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return request.clone({
    setHeaders: {
      Authorization: `JWT ${token}`
    }
  });
}

function handleError(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return new Observable(observer => {
      authService.refreshToken().then(
        success => {
          isRefreshing = false;
          if (success) {
            const token = authService.getToken();
            if (token) {
              refreshTokenSubject.next(token);
              next(addToken(request, token)).subscribe(observer);
              return;
            }
          }
          // Refresh mislukt: log de gebruiker uit
          authService.showVerificationFailedAlert();
          observer.error('Token refresh failed');
        },
        error => {
          isRefreshing = false;
          authService.showVerificationFailedAlert();
          observer.error(error);
        }
      );
    });
  }

  return refreshTokenSubject.pipe(
    filter(token => token !== null),
    take(1),
    switchMap(token => next(addToken(request, token as string)))
  );
}


