import { Component, OnInit } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { Page } from '../models/page';
import { PageLike } from '../models/pageLike';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  pages: Page[];
  userData: AccountBasicData;
  constructor(
    private pageService: PagesService,
    private accountService: AccountService
  ) {}

  async getPages() {
    this.pages = await this.pageService.getPages();
    console.log(this.pages);
  }

  likePage(page: Page) {
    this.pageService.likePage(page.idPage).subscribe((data: PageLike) => {
      console.log(data);
    });
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  // getLike(pageId:number) {
  //   if (this.userData) {
  //     const check = this.post.comments.find(
  //       (item) => item.commentCreatorId == this.userData.idAccount
  //     );
  //     return check;
  //   }
  //   return false;
  // }
  ngOnInit() {
    this.getUserData();
    this.getPages();
  }
}
