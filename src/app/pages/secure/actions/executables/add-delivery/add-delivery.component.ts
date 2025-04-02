import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DeliveryService } from 'src/app/services/product-service/delivery.service';

@Component({
  standalone: false,
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss'],
})
export class AddDeliveryComponent  implements OnInit {
  deliveryForm: FormGroup;
  
  @Output() clearPageEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private deliveryService: DeliveryService,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.deliveryForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]], // count needs to be at least 1
      comment: [''], // comment is optional
    });
   }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.deliveryForm.valueChanges.subscribe(() => {
        this.ngZone.run(() => {});
      });
    });
  }

  onSubmit() {
    if (this.deliveryForm.valid) {
      this.addDelivery();
    }
  }

  async addDelivery() {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Verifiëren...',
      spinner: 'crescent',
    });
  
    await loading.present();
  
    try {
      // Verifieer token voordat de telling wordt toegevoegd
      const isVerified = await this.authService.verifyToken();
      if (!isVerified) {
        await loading.dismiss();
        return; // AuthService zal de gebruiker omleiden naar login
      }
  
      // Haal artikelgegevens op
      const article = await this.articleService.getSavedArticle();
      const location = await this.articleService.getSavedLocation();
      const count = this.deliveryForm.get('count')?.value;
      const comment = this.deliveryForm.get('comment')?.value;

      // Update de laadtekst voor beter UX
      loading.message = 'Actie verwerken...';
  
      // API call om de telling toe te voegen
      await this.deliveryService.addDelivery(article, location, count, comment);
  
      // Success melding
      await this.toastService.presentToast(
        'Succes',
        'Levering is succesvol toegevoegd',
        'top',
        'success',
        2000
      );
  
      // Reset formulier en clear event emitten
      this.deliveryForm.reset();
      this.clearPageEvent.emit();
  
    } catch (error) {
      console.error('error: ', error);
  
      // Toon foutmelding
      await this.toastService.presentToast(
        'Fout',
        'Er is een fout opgetreden bij het toevoegen van de levering',
        'top',
        'danger',
        2000
      );
    } finally {
      await loading.dismiss();
    }
  }



}
