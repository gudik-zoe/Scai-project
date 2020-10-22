import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  userData: Account;

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  getTheUpdatedImage() {
    this.accountService.imageSubject.subscribe((data: boolean) => {
      if (data) {
        this.getUserData();
      }
    });
  }

  ngOnInit() {
    this.getUserData();
    this.getTheUpdatedImage();
  }
}
