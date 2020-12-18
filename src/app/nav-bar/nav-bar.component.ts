import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
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
    private chatService: ChatService,
    private aroute: ActivatedRoute
  ) {}

  loggedIn: boolean;
  userData: AccountBasicData;
  myUnseenMessages: number;
  messageSubscription: Subscription;
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
    this.messageSubscription.unsubscribe();
    this.clearInterval();
  }

  notificationSound = new Audio('../../assets/swiftly-610.mp3');
  async getMyUnseenMessages() {
    this.myUnseenMessages = await this.chatService.getMyUnseenMessages();
    if (
      this.myUnseenMessages > 0 &&
      this.route.routerState.snapshot.url != '/chat'
    ) {
      console.log('calling just the number ');
      this.notificationSound.play();
    } else if (
      this.myUnseenMessages > 0 &&
      this.route.routerState.snapshot.url == '/chat'
    ) {
      this.notificationSound.play();

      this.chatService.haveNewMessages.next(true);
    }
  }

  goToChat() {
    this.route.navigate(['/chat']);
  }

  getClearUnseenMessagesSubject() {
    this.messageSubscription = this.chatService.clearUnseenMessages.subscribe(
      (data: boolean) => {
        if (data) {
          this.myUnseenMessages = 0;
        }
      }
    );
  }
  ngOnInit() {
    this.getMyUnseenMessages();
    this.navBarController();
    this.getTheUpdatedImage();
    this.startInterval();
    this.getClearUnseenMessagesSubject();
  }
  interval;

  startInterval() {
    this.interval = setInterval(() => {
      if (!this.chatService.chatIsActive) {
        this.getMyUnseenMessages();
      }
    }, 60000);
  }
  clearInterval() {
    clearInterval(this.interval);
  }
}
