import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  url = 'https://portal.toverland.nl/api/v1/stock/locations/';

  // get all Articles
  async getLocations() {
    return this.http.get(this.url, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`
      }
    }); 
  }

}
