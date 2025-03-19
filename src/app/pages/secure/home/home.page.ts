import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  openingTimes: string;
  closingTimes: string;
  weatherStatus: string;
  temperature: string;
  weatherIcon: string;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getWeather();
    this.getParkInfo();
  }

  async getParkInfo() {
    try {
      const response: any = await lastValueFrom(
        this.http.get('https://portal.toverland.nl/api/opening_times/today/', {
          headers: {
            Authorization: `Bearer  ${environment.TVLKey}`,
          },
        })
      );
      this.openingTimes = response[0].opening_time.slice(0, 5);
      this.closingTimes = response[0].closing_time.slice(0, 5);
    } catch (error) {
      console.error('Fout bij ophalen tijden:', error);
    }
  }

  async getWeather() {
    try {
      const response: any = await firstValueFrom(
        this.http.get('https://portal.toverland.nl/api/v1/weather/', {
          headers: {
            Authorization: `Bearer ${environment.TVLKey}`,
          },
        })
      );
      this.weatherStatus = response.detailed_status;
      this.temperature = response.temperature_str;
      this.weatherIcon = response.weather_icon_url
      ;

    } catch (error) {
      console.error('Fout bij ophalen weer:', error);
    }
  }
}
