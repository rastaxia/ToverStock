import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { MoveService } from 'src/app/services/product-service/move.service';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { LocationsService } from 'src/app/services/product-service/locations.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  standalone: false,
  selector: 'app-move-product',
  templateUrl: './move-product.component.html',
  styleUrls: ['./move-product.component.scss'],
})
export class MoveProductComponent  implements OnInit {
  moveForm: FormGroup;

  @Output() clearPageEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private moveService: MoveService,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private locations: LocationsService,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.moveForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]],
      // location2: ['', [Validators.required]],
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

  onSubmit() {
    if (this.moveForm.valid) {
      this.moveProduct();
    }
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

    // Action change
    locationChange(event: any) {
      this.secondLocation = event.target.value;
    }

// Move product
async moveProduct() {
  const loading = await this.loadingController.create({
    cssClass: 'default-loading',
    message: 'Verifiëren...',
    spinner: 'crescent',
  });

  await loading.present();

  try {
    const isVerified = await this.authService.verifyToken();
    if (!isVerified) {
      await loading.dismiss();
      return; // AuthService zal de gebruiker omleiden naar login
    }

    // Haal artikelgegevens op
    const article = await this.articleService.getSavedArticle();
    const count = this.moveForm.get('count')?.value;
    const comment = this.moveForm.get('comment')?.value;

    // Update de laadtekst voor beter UX
    loading.message = 'Actie verwerken...';

    // call 1

    await this.moveService.moveProduct(
      article.itemID,
      this.secondLocation,
      count,
      comment
    );

    await this.moveService.moveProduct(
      article.itemID,
      article.locationID,
      -count,
      comment
    );

    // Success melding
    await this.toastService.presentToast(
      'Succes',
      'Levering is succesvol toegevoegd',
      'top',
      'success',
      2000
    );

    // Reset formulier en clear event emitten
    this.moveForm.reset();
    this.clearPageEvent.emit();
  } catch (error) {
    console.error('error: ', error);

    // Toon foutmelding
    await this.toastService.presentToast(
      'Fout',
      'Er is een fout opgetreden bij het toevoegen van de verplaatsing',
      'top',
      'danger',
      2000
    );
  } finally {
    await loading.dismiss();
  }
}




}
