import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/product-service/article.service';
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

  // get articles from the API
  async getArticles() {
    try {
      const response : any = await firstValueFrom(await this.articleService.getArticles(this.pageNumber));
      for (let i = 0; i < response.results.length; i++) {
        this.articles.push(response.results[i]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // infite scroll function
  onScroll(event: any) {
    this.pageNumber++;
    this.getArticles();
    setTimeout(() => {
      event.target.complete();
    }, 500);
    
  }

  // open article modal
  openArticle(id: number) {
    const modal = this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        id: id
      }
    });
    modal.then((m) => m.present());
  }


  isLoading = false; 

  // Search function
  search(event: any) {
    clearTimeout(this.searchTimeout);
    this.articles = [];
    this.isLoading = true; 
    this.searchTimeout = setTimeout(async () => {
      try {
        const response: any = await firstValueFrom(
          await this.articleService.searchArticles(event.target.value)
        );
  
        this.articles = response.results;
  
      } catch (error) {
        console.error("Error fetching articles", error);
      } finally {
        this.isLoading = false; 
      }
    }, 500);
  }
  


  
}
