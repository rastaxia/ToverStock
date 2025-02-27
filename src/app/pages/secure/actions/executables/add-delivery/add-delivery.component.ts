import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { CountService } from 'src/app/services/product-service/count.service';
import { LoadingController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.scss'],
})
export class AddDeliveryComponent  implements OnInit {
  deliveryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ngZone: NgZone,
    private countService: CountService,
    private articleService: ArticleService,
    private loadingController: LoadingController
  ) {
    this.deliveryForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]],
      comment: [''],
    });
   }

  ngOnInit() {}

}
