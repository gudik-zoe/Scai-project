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
      this.photos = await this.pageService.getPagePhotos(this.page.idPage);
    }
    this.checkForDuplicatPhotos(this.photos);
  }

  openImage(image: string) {
    this.image = image;
  }
  checkForDuplicatPhotos(photos: string[]) {
    let thePhotos = [];
    let repeatedPhotos = [];
    for (let photo of photos) {
      let urlEndsWith = photo.slice(25, 30);
      if (!repeatedPhotos.includes(urlEndsWith)) {
        repeatedPhotos.push(urlEndsWith);
        thePhotos.push(photo);
      }
    }
    this.photos = thePhotos;
  }

  ngOnInit() {
    this.getPhotos();
  }
}
