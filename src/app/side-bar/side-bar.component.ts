import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private route: Router,
    private accountService: AccountService,
    private _sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}
  userImage;
  userData;

  getUserData() {
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    this.getUserData();
    this.accountService.imageSubject.subscribe((data) => {
      if (data) {
        this.getUserData();
      }
    });
  }
}
