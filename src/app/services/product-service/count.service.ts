import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { lastValueFrom, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  url = 'https://portal.toverland.nl/api/v1/stock/counts/';

  // add to count
  async addCount(
    productID: number,
    locationID: number,
    count: number,
    extra_info: string
  ) {
    //header
    const headers = new HttpHeaders({
      Authorization: `JWT ${this.authService.getToken()}`,
    });

    // body
    const body = {
      article: productID,
      location: locationID,
      stock: count,
      extra_info: extra_info,
    };

    try {
      // wait 5 seconds before actually doing the call
      const response = await lastValueFrom(
        this.http.post(this.url, body, { headers })
      );
      return response;
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
  }
}
