import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { CountService } from 'src/app/services/product-service/count.service';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { LocationsService } from 'src/app/services/product-service/locations.service';

@Component({
  standalone: false,
  selector: 'app-move-product',
  templateUrl: './move-product.component.html',
  styleUrls: ['./move-product.component.scss'],
})
export class MoveProductComponent  implements OnInit {
  moveForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private countService: CountService,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private locations: LocationsService
  ) {
    this.moveForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]],
      location2: ['', [Validators.required]],
      comment: [''],
    });
   }

   secondLocation: number;
   locationList = [];

  ngOnInit() {
    this.ngZone.run(() => {
      this.getLocations();
    });
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

    // Action chn
    locationChange(event: any) {
      this.secondLocation = event.target.value;
    }

    // Move product
    async moveProduct() {
      
    }



}
