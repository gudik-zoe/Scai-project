import { Component, OnInit } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { Page } from '../models/page';
import { PageLike } from '../models/pageLike';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-pages-container',
  templateUrl: './pages-container.component.html',
  styleUrls: ['./pages-container.component.css'],
})
export class PagesContainerComponent implements OnInit {
  constructor(
    private pageService: PagesService,
    private accountService: AccountService
  ) {}
  pages: Page[];
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
  likePageInParent(page: Page) {
    this.pageService.likePage(page.idPage).subscribe((data: PageLike) => {
      if (data) {
        page.pageLike.push(data);
      } else {
        page.pageLike.pop();
      }
    });
  }

  ngOnInit() {
    this.getUserData();
    this.getPages();
  }
}
