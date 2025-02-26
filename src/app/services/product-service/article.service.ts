import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  url = 'https://portal.toverland.nl/api/v1/stock/articles/';
  
  // get all Articles
  async getArticles(pageNumber: number) {
    return this.http.get(this.url + '?page=' + pageNumber, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`
      }
    }); 
  }

  // THIS WLL GET FIXED NOT WORKING FOR NOW 
  // get Articles by barcode
  async getArticleByBarcode(barcode: string) {
    return this.http.get(this.url + 'find-by-barcode/' + barcode + '/', {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`
      }});
  }

  // get specific Articles with
  async getArticle(id: number) {
    return this.http.get(this.url + id + '/', {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`
      }
    });
  }


  // search 
async searchArticles(search: string) {
    return this.http.get(this.url + 'search/?search=' + search, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`
      }});
    }
  

}
