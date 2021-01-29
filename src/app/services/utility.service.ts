import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { PageBasicData } from '../models/pageBasicData';
import { PagesService } from './pages.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl;

  pagesData: PageBasicData[] = [];
  getPageData(pageId: number) {
    return new Promise<PageBasicData>((resolve, reject) => {
      const page = this.pagesData.find(
        (item: PageBasicData) => item.idPage == pageId
      );
      if (page) {
        resolve(page);
      } else {
        this.http.get(this.rootUrl + 'pages/getPage/' + pageId).subscribe(
          (thePage: PageBasicData) => {
            this.pagesData.push(thePage);
            resolve(thePage);
          },
          (error) => reject(error.error.message)
        );
      }
    });
  }
}
