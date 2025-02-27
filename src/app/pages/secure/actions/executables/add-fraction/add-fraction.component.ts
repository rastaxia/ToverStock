import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { CountService } from 'src/app/services/product-service/count.service';
import { LoadingController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-add-fraction',
  templateUrl: './add-fraction.component.html',
  styleUrls: ['./add-fraction.component.scss'],
})
export class AddFractionComponent  implements OnInit {
  fractionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private countService: CountService,
    private articleService: ArticleService,
    private loadingController: LoadingController
  ) {
    this.fractionForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]],
      comment: [''],
    });
   }

  ngOnInit() {}

}
