import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { firstValueFrom } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from 'src/app/services/modal-controller/modal.component';

@Component({
  standalone: false,
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
    private articleService: ArticleService,
    private modalCtrl: ModalController
  ) { }

  pageNumber = 1;
  articles: any[] = [];
  searchTimeout: any;

  ngOnInit() {
   this.getArticles();
   
  }

  async getArticles() {
    try {
      const response : any = await firstValueFrom(await this.articleService.getArticles(this.pageNumber));
      // console.log(response.results);
      for (let i = 0; i < response.results.length; i++) {
        this.articles.push(response.results[i]);
      }
      console.log(this.articles);
    } catch (error) {
      console.error('Er is een fout opgetreden:', error);
    }
  }

  onScroll(event: any) {
    this.pageNumber++;
    this.getArticles();
    setTimeout(() => {
      event.target.complete();
    }, 500);
    
  }

  openArticle(id: number) {
    const modal = this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        id: id
      }
    });
    modal.then((m) => m.present());
  }

   search(event: any) {
    clearTimeout(this.searchTimeout); 

    this.articles = [];
    this.searchTimeout = setTimeout(async () => {
      const response : any = await firstValueFrom(await this.articleService.searchArticles(event.target.value));
      console.log(response.results);
      for (let i = 0; i < response.results.length; i++) {
        this.articles.push(response.results[i]);
      }
      
    }, 500);
  }



  
}
