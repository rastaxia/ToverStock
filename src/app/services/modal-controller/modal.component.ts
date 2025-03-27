import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; 
import { firstValueFrom } from 'rxjs';
import { ArticleService } from 'src/app/services/product-service/article.service';
import { ScanService } from '../scan.service';

@Component({
  standalone: false,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  @Input() id!: number;
  article: any = [];

  constructor(
    private modalCtrl: ModalController,
    private scanService: ScanService,
    private router: Router,
    private articleService: ArticleService  
  ) { }

  ngOnInit() {
    this.getArticle();
  }

    closeModal() {
      this.article = [];
      return this.modalCtrl.dismiss();
    }

    async getArticle() {
      const response = await firstValueFrom( await this.articleService.getArticle(this.id));
      this.article = response;
    }

    async changeArticle() {
      this.scanService.setScan(this.article.barcode);
      this.closeModal();
      this.router.navigateByUrl('/actions');
    }


}
