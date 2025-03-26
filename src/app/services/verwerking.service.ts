import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class VerwerkingService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  count = 'https://portal.toverland.nl/api/v1/stock/counts/';
  mutations = 'https://portal.toverland.nl/api/v1/stock/stock-changes/';
  date = new Date();
  year = this.date.getFullYear();
  month = String(this.date.getMonth() + 1).padStart(2, '0');
  day = String(this.date.getDate()).padStart(2, '0');
  formattedDate = `${this.year}-${this.month}-${this.day}`;

  // get all counts
  async getCounts(page?: number) {
    return this.http.get(this.count, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`,
      },
      params: {
        date: this.formattedDate,
        ...(page ? { page: page } : {})
      }
    });
  }

  // get all mutations
  async getMutations(page?: number) {
    return this.http.get(this.mutations, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`,
      },
      params: {
        date: this.formattedDate,
        ...(page ? { page: page } : {})
      }
    });
  }
}
