import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FractionService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  
  url = 'https://portal.toverland.nl/api/v1/stock/stock-changes/';

  // add to count
  async addFraction(
    productID: number,
    locationID: number,
    count: number,
    extra_info: string
  ) {
    // body
    const body = {
      article: productID,
      location: locationID,
      stock_change: count,
      extra_info: extra_info,
      stock_change_type: 'breuk'
    };
    try {
      const response = await lastValueFrom(
        this.http.post(this.url, body, { headers: {
          Authorization: `JWT ${this.authService.getToken()}`
        } })
      );
      return response;
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
  }
}
