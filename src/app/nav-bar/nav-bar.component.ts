import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private aroute: ActivatedRoute,
    private friendService: FriendsService
  ) {}

  loggedIn: boolean;
  userData: AccountBasicData;
  imgUrl: string = environment.rootUrl + 'files/';
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }
  navBarController() {
    this.getUserData();
  }
  public subscribtion: Subscription;
  getTheUpdatedImage() {
    this.subscribtion = this.accountService.imageSubject.subscribe(
      async (data: boolean) => {
        if (data) {
          this.userData = await this.accountService.getTheLoggedInUserData();
        }
      }
    );
  }

  delete() {
    this.accountService.deleteAccount().subscribe((data) => {});
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

  async goToProfile() {
    this.route.navigate([
      '/user-profile',
      await this.friendService.getIdFromUtl(),
    ]);
  }

  logOut() {
    this.accountService.userData = undefined;
    this.accountService.loggedIn.next(false);
    localStorage.removeItem('token');
    this.route.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  ngOnInit() {
    this.navBarController();
    this.getTheUpdatedImage();
  }
}
