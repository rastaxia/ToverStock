import { Component, OnInit } from '@angular/core';
import { ParkService } from 'src/app/services/park.service';



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
  shopInfo: any;



  constructor(private parkService: ParkService,
    
    ) {}

  ngOnInit(): void {
    this.getParkInfo();
  }

  async getParkInfo() {
    const parkTimes = await this.parkService.openingTimes();
    const weather = await this.parkService.getWeather();
    const shops = await this.parkService.getShopInfo();
    this.openingTimes = parkTimes.opening_times?.slice(0, 5);
    this.closingTimes = parkTimes.closing_times?.slice(0, 5);
    this.weatherStatus = weather.detailed_status;
    this.temperature = weather.temperature_str;
    this.weatherIcon = weather.weather_icon_url;
    this.shopInfo = shops;
  }

}
