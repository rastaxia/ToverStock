import { Component, OnInit } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // https://weerlive.nl/api/weerlive_api_v2.php?key=4fb93628b1&locatie=sevenum

  async saveWeather(data:any){

  }

  async getWeather(){

  }


}
