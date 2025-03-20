import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { CountService } from 'src/app/services/product-service/count.service';
import { LoadingController } from '@ionic/angular';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  standalone: false,
  selector: 'app-add-count',
  templateUrl: './add-count.component.html',
  styleUrls: ['./add-count.component.scss']
})
export class AddCountComponent implements OnInit {
  // Form group for handling count and comment inputs
  countForm: FormGroup;

  @Output() clearPageEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private countService: CountService,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    // Initialize form with validators
    this.countForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]], // Count must be at least 1
      comment: [''], // Optional comment field
    });
  }

  ngOnInit() {
    // Handle form value changes outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      this.countForm.valueChanges.subscribe(() => {
        this.ngZone.run(() => {});
      });
    });
  }
  
  /**
   * Handler for form submission
   * Validates form and initiates count verification process
   */
  onSubmit() {
    if (this.countForm.valid) {
      this.addCount();
    }
  }

  async addCount() {
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
      const count = this.countForm.get('count')?.value;
      const comment = this.countForm.get('comment')?.value;
  
      // Update de laadtekst voor beter UX
      loading.message = 'Actie verwerken...';
  
      // API call om de telling toe te voegen
      await this.countService.addCount(article.itemID, article.locationID, count, comment);
  
      // Success melding
      await this.toastService.presentToast(
        'Succes',
        'Telling is succesvol toegevoegd',
        'top',
        'success',
        2000
      );
  
      // Reset formulier en clear event emitten
      this.countForm.reset();
      this.clearPageEvent.emit();
  
    } catch (error) {
      console.error('error: ', error);
  
      // Toon foutmelding
      await this.toastService.presentToast(
        'Fout',
        'Er is een fout opgetreden bij het toevoegen van de telling',
        'top',
        'danger',
        2000
      );
    } finally {
      await loading.dismiss();
    }
  }
  
}
