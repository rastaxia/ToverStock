import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  locationID = 0;
  itemID = 0;

  url = 'https://portal.toverland.nl/api/v1/stock/articles/';

  // get all Articles
  async getArticles(pageNumber: number) {
    return this.http.get(this.url + '?page=' + pageNumber, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`,
      },
    });
  }

  // get Articles by barcode
  async getArticleByBarcode(barcode: string) {
    return this.http.get(this.url + 'find-by-barcode/' + barcode + '/', {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`,
      },
    });
  }

  // get specific Articles with
  async getArticle(id: number) {
    return this.http.get(this.url + id + '/', {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`,
      },
    });
  }

  // search
  async searchArticles(search: string) {
    return this.http.get(this.url + 'search/?search=' + search, {
      headers: {
        Authorization: `JWT ${this.authService.getToken()}`,
      },
    });
  }

  // save article
  async saveArticle(itemID: number) {
    this.itemID = itemID;
  }

  // save location
  async saveLocation(locationID: number) {
    this.locationID = locationID;
  }



  // get saved article
  async getSavedArticle() {
    return this.itemID;
  }

  // get saved location
  async getSavedLocation() {
    return this.locationID;
  }
}
