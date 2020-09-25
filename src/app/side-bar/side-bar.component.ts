import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  userData;
  constructor(
    private storageService: StorageService,
    private route: Router,
    private accountService: AccountService
  ) {}
  // image() {
  //   return this.storageService.getImage();
  // }

  getUserName() {
    return this.userData.firstName;
  }
  ngOnInit() {
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
      this.accountService.userData = data;
    });
  }
}
