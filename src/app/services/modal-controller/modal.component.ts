import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'; 
import { firstValueFrom } from 'rxjs';
import { ArticleService } from 'src/app/services/article.service';

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
}
