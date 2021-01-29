import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountBasicData } from '../models/accountBasicData';
import { PageBasicData } from '../models/pageBasicData';
import { PageLike } from '../models/pageLike';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  constructor(private accountService: AccountService, private route: Router) {}

  @Input() page: PageBasicData;
  @Input() userData: AccountBasicData;
  @Input() i: number;

  @Output() likePage = new EventEmitter<PageBasicData>();

  likePageInChild(page: PageBasicData) {
    this.likePage.emit(page);
  }
  index: string;

  getIndex() {
    this.i == 0 ? (this.index = '0.8s') : (this.index = this.i + 's');
  }

  getLike() {
    if (this.userData) {
      const check = this.page.likers.find(
        (item) => item.pageLikeCreatorId == this.userData.idAccount
      );
      return check;
    }
    return false;
  }

  goToPage() {
    this.route.navigate(['/user-pages', this.page.idPage]);
  }

  ngOnInit() {
    this.getIndex();
  }
}
