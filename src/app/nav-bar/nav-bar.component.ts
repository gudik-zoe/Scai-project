import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private accountService: AccountService, private route: Router) {}
  loggedIn: boolean;
  userData: Account;
  imgUrl: string = environment.rootUrl + 'files/';

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

  delete() {
    this.accountService.deleteAccount().subscribe((data) => {
      console.log(data);
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
    this.accountService.userData = undefined;
    this.accountService.loggedIn.next(false);
    localStorage.removeItem('token');
    this.route.navigate(['/auth']);
  }
  ngOnInit() {
    this.navBarController();
    this.getTheUpdatedImage();
  }
}
