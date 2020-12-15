import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-account-photos',
  templateUrl: './account-photos.component.html',
  styleUrls: ['./account-photos.component.css'],
})
export class AccountPhotosComponent implements OnInit {
  photos: string[];
  constructor(private accountService: AccountService) {}

  async getPhotos() {
    this.photos = await this.accountService.getAccountPhotos();
  }

  ngOnInit() {
    this.getPhotos();
  }
}
