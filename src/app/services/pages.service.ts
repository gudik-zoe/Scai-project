import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../models/page';
import { PageBasicData } from '../models/pageBasicData';
import { PostsService } from './posts.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(
    private postService: PostsService,
    private http: HttpClient,
    private utilityService: UtilityService
  ) {}

  rootUrl: string = environment.rootUrl;
  userAccess: boolean;
  addPost = new Subject<any>();
  createPage(page: FormData) {
    return this.http.post(this.rootUrl + 'create/page', page);
  }

  likePage(idPage: number) {
    return this.http.post(this.rootUrl + 'page/likePage/' + idPage, {});
  }

  getMyPages() {
    return new Promise<PageBasicData[]>((resolve, reject) => {
      this.http.get(this.rootUrl + 'myPages').subscribe(
        (data: PageBasicData[]) => {
          resolve(data);
        },
        (error) => reject(error.error.message)
      );
    });
  }

  pages: PageBasicData[] = [];
  getPages() {
    return new Promise<PageBasicData[]>((resolve, reject) => {
      this.http.get(this.rootUrl + 'pages').subscribe(
        (data: PageBasicData[]) => {
          this.pages = data;
          resolve(this.pages);
        },
        (error) => reject(error.error.message)
      );
    });
  }

  addPagePost(formData: FormData) {
    return this.http.post(this.rootUrl + 'posts/pageId', formData);
  }

  likeComment(commentId: number) {
    return this.http.post(
      this.rootUrl + 'page/addLikeToComment/' + commentId,
      {}
    );
  }
  page: Page;
  getPageFullData(pageId: number) {
    return new Promise<Page>((resolve, reject) => {
      this.http.get(this.rootUrl + 'pageFullData/' + pageId).subscribe(
        (data: Page) => {
          this.page = data;
          for (let post of this.page.posts) {
            this.postService.getUserDetails(post);
          }
          resolve(this.page);
        },
        (error) => reject(error.error.message)
      );
    });
  }

  updateThePage(newPage: FormData) {
    return this.http.put(this.rootUrl + 'updatePage', newPage);
  }

  getPagePhotos(pageId: number) {
    return new Promise<string[]>((resolve, reject) => {
      this.http.get(this.rootUrl + 'pagePhotos/' + pageId).subscribe(
        (data: string[]) => {
          resolve(data);
        },
        (error) => reject(error.error.message)
      );
    });
  }
}
