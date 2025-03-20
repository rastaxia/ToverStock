import { Component, OnInit, NgZone, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { FractionService } from 'src/app/services/product-service/fraction.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  standalone: false,
  selector: 'app-add-fraction',
  templateUrl: './add-fraction.component.html',
  styleUrls: ['./add-fraction.component.scss'],
})
export class AddFractionComponent implements OnInit {
  fractionForm: FormGroup;

  @Output() clearPageEvent = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private fractionService: FractionService,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private authService: AuthService,
    private toastService: ToastService
  ) {
    this.fractionForm = this.fb.group({
      count: ['', [Validators.required, this.customValidator]], // custom validator to check if the input is not empty
      comment: [''],
    });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.fractionForm.valueChanges.subscribe(() => {
        this.ngZone.run(() => {});
      });
    });
  }

  onSubmit() {
    if (this.fractionForm.valid) {
      this.addFraction();
    }
  }

  customValidator(control: any) {
    const value = control.value;
    if (value && value.toString().length > 0) {
      return null;
    }
    return {invalid: true};
  }

  async addFraction() {
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
      const count = this.fractionForm.get('count')?.value;
      const comment = this.fractionForm.get('comment')?.value;

      // Update de laadtekst voor beter UX
      loading.message = 'Actie verwerken...';

      // API call om de telling toe te voegen
      await this.fractionService.addFraction(
        article.itemID,
        article.locationID,
        count,
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
      this.fractionForm.reset();
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
