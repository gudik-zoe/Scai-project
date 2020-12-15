import { Component, Input, OnInit } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-photos',
  templateUrl: './account-photos.component.html',
  styleUrls: ['./account-photos.component.css'],
})
export class AccountPhotosComponent implements OnInit {
  photos: string[];
  userData: AccountBasicData;
  constructor(private accountService: AccountService) {}

  @Input() account: AccountBasicData;

  async getPhotos() {
    this.photos = await this.accountService.getAccountPhotos(
      this.account.idAccount
    );
  }

  getUserData() {
    this.userData = this.accountService.userData;
  }

  ngOnInit() {
    this.getUserData();
    this.getPhotos();
  }
}
