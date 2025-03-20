import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  url = 'https://portal.toverland.nl/api/v1/stock/stock-changes/';

  // add to count
  async addDelivery(
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
      stock_change_type: 'levering'
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
