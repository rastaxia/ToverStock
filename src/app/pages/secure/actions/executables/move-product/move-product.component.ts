import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { CountService } from 'src/app/services/product-service/count.service';
import { LoadingController } from '@ionic/angular';

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
    private loadingController: LoadingController
  ) {
    this.moveForm = this.fb.group({
      count: ['', [Validators.required, Validators.min(1)]],
      location2: ['', [Validators.required]],
      comment: [''],
    });
   }

  ngOnInit() {}

}
