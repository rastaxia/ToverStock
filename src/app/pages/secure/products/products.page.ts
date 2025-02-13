import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  constructor(
    private articleService: ArticleService
  ) { }

  pageNumber = 1;
  articles: any[] = [];

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
  
}
