import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  constructor(
    private pageService: PagesService,
    private accountService: AccountService
  ) {}

  @Input() page: Page;
  @Input() userData: AccountBasicData;

  @Output() likePage = new EventEmitter<Page>();

  likePageInChild(page: Page) {
    this.likePage.emit(page);
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  getLike() {
    if (this.userData) {
      const check = this.page.pageLike.find(
        (item) => item.pageLikeCreatorId == this.userData.idAccount
      );
      return check;
    }
    return false;
  }

  ngOnInit() {
    this.getUserData();
  }
}
