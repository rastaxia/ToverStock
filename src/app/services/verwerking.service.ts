import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class VerwerkingService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  

}
