import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private accountService: AccountService, private route: Router) {}
  loggedIn: boolean;
  userData: Account;

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }
  navBarController() {
    this.getUserData();
  }

  getTheUpdatedImage() {
    this.accountService.imageSubject.subscribe(async (data: boolean) => {
      if (data) {
        this.userData = await this.accountService.getTheLoggedInUserData();
      }
    });
  }

  deactivate() {
    this.accountService.deleteAccount().subscribe(
      (data) => {
        localStorage.removeItem('token');
        this.route.navigate(['/auth']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  goToHomePage() {
    this.route.navigate(['/home-page']);
  }

  goToProfile(id: number) {
    this.route.navigate(['/user-profile', id]);
  }

  logOut() {
    this.userData = undefined;
    this.accountService.loggedIn.next(false);
    localStorage.removeItem('token');
    this.route.navigate(['/auth']);
  }
  ngOnInit() {
    this.navBarController();
  }
}
