import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  constructor(private accountService: AccountService, private route: Router) {}
  userData: Account;
  imgUrl: string = environment.rootUrl + 'files/';
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  getTheUpdatedImage() {
    this.accountService.imageSubject.subscribe(async (data: boolean) => {
      if (data) {
        this.userData = await this.accountService.getTheLoggedInUserData();
      }
    });
  }

  goToChat() {
    this.route.navigate(['/chat']);
  }

  ngOnInit() {
    this.getUserData();
    this.getTheUpdatedImage();
  }
}
