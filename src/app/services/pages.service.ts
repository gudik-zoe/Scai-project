import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl;

  pages: Page[] = [];

  getPages() {
    return new Promise<Page[]>((resolve, reject) => {
      this.http.get(this.rootUrl + 'pages').subscribe((data: Page[]) => {
        resolve(data);
        reject('unknown error occured');
      });
    });
  }

  likePage(idPage: number) {
    return this.http.post(this.rootUrl + 'page/likePage/' + idPage, {});
  }

  getPageData(pageId: number) {
    return new Promise<Page>((resolve, reject) => {
      const check = this.pages.find((item: Page) => {
        item.idPage == pageId;
      });
      if (check) {
        resolve(check);
      } else {
        this.http
          .get(this.rootUrl + 'pages/getPage/' + pageId)
          .subscribe((data: Page) => {
            resolve(data);
          });
      }
    });
  }
}
