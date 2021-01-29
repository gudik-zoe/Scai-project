import { Component, OnInit } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { PageBasicData } from '../models/pageBasicData';
import { PageLike } from '../models/pageLike';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-pages-container',
  templateUrl: './pages-container.component.html',
  styleUrls: ['./pages-container.component.css'],
})
export class PagesContainerComponent implements OnInit {
  constructor(
    private pageService: PagesService,
    private accountService: AccountService,
    private postService: PostsService
  ) {}
  pages: PageBasicData[];
  userData: AccountBasicData;

  async getPages() {
    this.pages = await this.pageService.getPages();
    console.log(this.pages);
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  likePageInParent(page: PageBasicData) {
    this.pageService.likePage(page.idPage).subscribe((data: PageLike) => {
      if (data) {
        page.likers.push(data);
      } else {
        page.likers.pop();
      }
    });
  }

  ngOnInit() {
    this.getUserData();
    this.getPages();
  }
}
