import { Component, Input, OnInit } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { Page } from '../models/page';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-account-photos',
  templateUrl: './account-photos.component.html',
  styleUrls: ['./account-photos.component.css'],
})
export class AccountPhotosComponent implements OnInit {
  photos: string[];
  userData: AccountBasicData;
  image: string = null;
  constructor(
    private accountService: AccountService,
    private pageService: PagesService
  ) {}

  @Input() account: AccountBasicData;

  @Input() page: Page;

  async getPhotos() {
    if (this.account) {
      this.photos = await this.accountService.getAccountPhotos(
        this.account.idAccount
      );
    } else {
      this.pageService
        .getPagePhotos(this.page.idPage)
        .subscribe((data: string[]) => {
          this.photos = data;
          this.photos.push(this.page.profilePhoto);
          this.photos.push(this.page.coverPhoto);
        });
    }
  }

  openImage(image: string) {
    this.image = image;
  }

  ngOnInit() {
    this.getPhotos();
  }
}
