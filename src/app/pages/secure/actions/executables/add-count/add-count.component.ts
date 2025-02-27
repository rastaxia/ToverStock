import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { CountService } from 'src/app/services/product-service/count.service';
import { LoadingController } from '@ionic/angular';
import { timeout } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

/**
 * Component for adding count to inventory items
 * Handles form submission and API interaction for updating item counts
 */
@Component({
  standalone: false,
  selector: 'app-add-count',
  templateUrl: './add-count.component.html',
  styleUrls: ['./add-count.component.scss']
})
export class AddCountComponent implements OnInit {
  // Form group for handling count and comment inputs
  countForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private countService: CountService,
    private articleService: ArticleService,
    private loadingController: LoadingController,
    private authService: AuthService
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
      this.verifyAndAddCount();
    }
  }

  /**
   * Verifies user authentication before proceeding with count addition
   * Shows loading spinner during verification process
   */
  async verifyAndAddCount() {
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Verifiëren...',
      spinner: 'crescent',
    });

    await loading.present();

    try {
      // Verify user's authentication token
      const isVerified = await this.authService.verifyToken();
      
      // If not verified, stop process and return
      if (!isVerified) {
        await loading.dismiss();
        return; // AuthService will handle redirect to login
      }

      // If verified, proceed with adding count
      await this.addCount();
      loading.dismiss();
      
    } catch (error) {
      console.error('Verification error:', error);
      await loading.dismiss();
    }
  }

  /**
   * Handles the actual count addition process
   * Retrieves form values and makes API call to update count
   */
  async addCount() {
    // Get saved article details
    const article = await this.articleService.getSavedArticle();
    const count = this.countForm.get('count')?.value;
    const comment = this.countForm.get('comment')?.value;

    // Show loading spinner during API call
    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Actie verwerken...',
      spinner: 'crescent',
    });

    await loading.present();

    try {
      // Make API call to update count
      await this.countService.addCount(
        article.itemID, 
        article.locationID, 
        count, 
        comment
      );
      loading.dismiss();
      // TODO: Reset page to just have location and action selected
      
    } catch (error) {
      console.error('error: ', error);
      await loading.dismiss();
    }
  }
}
