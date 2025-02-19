import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { LocationsService } from 'src/app/services/locations.service';

@Component({
  standalone: false,
  selector: 'app-actions',
  templateUrl: './actions.page.html',
  styleUrls: ['./actions.page.scss'],
})
export class ActionsPage implements OnInit {
  form: FormGroup;
  selectedAction: string;
  locationList = [];

  constructor(
    private locations: LocationsService
  ) {
    this.selectedAction = '';
  }

  onActionChange() {
    console.log('Selected action:', this.selectedAction);
  }

  // Gets all locations
  async getLocations() {
    try {
      const response: any = await firstValueFrom(
        await this.locations.getLocations()
      );
      this.locationList = response.results;
      console.log('Locations:', this.locationList);
    } catch (error) {
      console.log('Error:', error);
    }
    
  }

  ngOnInit() {
    this.getLocations();
  }
}
