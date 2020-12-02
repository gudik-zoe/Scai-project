import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
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
    private friendsService: FriendsService
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
      (data: string) => {
        this.userData.profilePhoto = data;
      }
    );
  }

  delete() {
    this.accountService.deleteAccount().subscribe((data) => {});
  }
  openFriendsTab() {
    this.friendsService.openFriendsTab.next(true);
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

  goToProfile() {
    // this.friendService.uploadProfile.next(this.userData);
    this.route.navigate(['/user-profile', this.userData.idAccount]);
  }

  logOut() {
    this.accountService.userData = undefined;
    this.accountService.myFriends = undefined;
    this.accountService.peopleYouMayKnow = undefined;
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
