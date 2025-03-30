import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LocationsService } from 'src/app/services/product-service/locations.service';

@Component({
  standalone: false,
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
})
export class LocationsPage implements OnInit {

  locationList: any = [];
  selectedLocation: number;

  constructor(
    private locations: LocationsService
  ) { }

  ngOnInit() {
    this.getLocations();
  }
  
  // Gets all locations
  async getLocations() {
    try {
      const response: any = await firstValueFrom(
        await this.locations.getLocations()
      );
      this.locationList = response.results;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  onLocationChange(event: any) {
    this.selectedLocation = event.target.value;
  }
  

}
