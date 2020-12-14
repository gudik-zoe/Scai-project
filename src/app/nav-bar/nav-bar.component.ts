import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { FriendsService } from '../services/friends.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private friendsService: FriendsService,
    private chatService: ChatService
  ) {}

  loggedIn: boolean;
  userData: AccountBasicData;
  myMessages: number;
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
    this.clearInterval();
    localStorage.removeItem('token');
    this.route.navigate(['/auth']);
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
    this.clearInterval();
  }

  async getMyMessages() {
    this.myMessages = await this.chatService.getMyMessages();
  }

  goToChat() {
    this.myMessages = 0;
    this.route.navigate(['/chat']);
  }
  ngOnInit() {
    this.getMyMessages();
    this.navBarController();
    this.getTheUpdatedImage();
    this.startInterval();
  }
  interval;

  startInterval() {
    this.interval = setInterval(() => {
      this.getMyMessages();
    }, 10000);
  }

  clearInterval() {
    clearInterval(this.interval);
  }
}
