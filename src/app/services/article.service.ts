import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  url = 'https://portal.toverland.nl/api/v1/stock/articles/';
  
  async getArticles(pageNumber: number) {
    return this.http.get(this.url + '?page=' + pageNumber, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`
      }
    }); 
  }

  async getArticle(id: number) {
    return this.http.get(this.url + id + '/', {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`
      }
    });
  }

  

  

}
