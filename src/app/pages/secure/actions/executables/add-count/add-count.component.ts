import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { CountService } from 'src/app/services/product-service/count.service';
import { LoadingController } from '@ionic/angular';
import { timeout } from 'rxjs';


@Component({
  standalone: false,
  selector: 'app-add-count',
  templateUrl: './add-count.component.html',
  styleUrls: ['./add-count.component.scss']
})
export class AddCountComponent implements OnInit {
  countForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private countService: CountService,
    private articleService: ArticleService,
    private loadingController: LoadingController
  ) {
    this.countForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]],
      comment: [''],
    });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      this.countForm.valueChanges.subscribe(() => {
        this.ngZone.run(() => {});
      });
    });
  }
  
  onSubmit() {
    if (this.countForm.valid) {
      
      this.addCount();
    }
  }

  async addCount() {
   const article = await this.articleService.getSavedArticle()
    const count = this.countForm.get('count')?.value;
    const comment = this.countForm.get('comment')?.value;

    const loading = await this.loadingController.create({
      cssClass: 'default-loading',
      message: 'Actie verwerken...',
      spinner: 'crescent',
    });

    await loading.present();

    try {
      const call = await this.countService.addCount(article.itemID, article.locationID, count, comment)
      loading.dismiss();
      // reset page to just have location and action selected
      
    } catch (error) {
      console.error('error: ', error);

      await loading.dismiss();
    }
  }

}
