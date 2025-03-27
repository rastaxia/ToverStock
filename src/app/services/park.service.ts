import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ParkService {
  constructor(private http: HttpClient,
    private authService: AuthService
    ) {}

  async openingTimes() {
    try {
      const response: any = await lastValueFrom(
        this.http.get('https://portal.toverland.nl/api/opening_times/today/', {
          headers: {
            Authorization: `Bearer  ${environment.TVLKey}`,
          },
        })
      );
      return response;
    } catch (error) {
      console.error('Fout bij ophalen tijden:', error);
    }
  }

  async getWeather() {
    try {
      const response: any = await lastValueFrom(
        this.http.get('https://portal.toverland.nl/api/v1/weather/', {
          headers: {
            Authorization: `Bearer ${environment.TVLKey}`,
          },
        })
      );
      return response;
    } catch (error) {
      console.error('Fout bij ophalen weer:', error);
    }
  }

  async getShopInfo() {
    try {
      const response: any = await lastValueFrom(
        this.http.get('https://portal.toverland.nl/api/v1/shops/', {
          headers: {
            Authorization: `JWT ${this.authService.getToken()}`,
          },
        })
      );
      return response;
    }
    catch (error) {
      console.error('Fout bij ophalen winkels:', error);
    }
  }
}
