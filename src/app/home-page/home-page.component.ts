import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { Post } from '../models/post';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostsService,
    private accountService: AccountService,
    private friendService: FriendsService
  ) {}
  userData: AccountBasicData;
  dbPosts: Post[];
  friends: AccountBasicData[];
  peopleYouMayKnow: AccountBasicData[];
  RespondToRequestSubject: Subscription;
  UnfriendSubject: Subscription;
  open: boolean = true;
  openFriends: number = 0;
  openFriendsubscription: Subscription;
  status: string = 'friends';
  image() {
    return this.userData?.profilePhoto;
  }

  async getFriends() {
    this.friends = await this.accountService.getAccountFriends();
  }
  async getPeopleyouMayKnow() {
    this.peopleYouMayKnow = await this.accountService.getPeopleYouMayKnow();
  }

  // openFriendTab() {
  //   this.openFriendsubscription = this.friendService.openFriendsTab.subscribe(
  //     (data: Boolean) => {
  //       if (!this.open) {
  //         this.openFriends = 1;
  //         this.open = true;
  //       } else {
  //         this.openFriends = 0;
  //         setTimeout(() => {
  //           this.open = false;
  //         }, 300);
  //       }
  //     }
  //   );
  // }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  openDiv(event: any) {
    this.postService.alertComponent.next({
      userData: this.userData,
      openComponent: true,
    });
  }

  async getPosts() {
    this.dbPosts = await this.postService.getHomePagePosts();
  }

  getRespondToRequestSubject() {
    this.RespondToRequestSubject = this.friendService.respondToRequest.subscribe(
      (data) => {
        if (data.status == 1) {
          this.peopleYouMayKnow = this.peopleYouMayKnow.filter(
            (item: AccountBasicData) =>
              item.idAccount != data.userBasicData.idAccount
          );
          this.friends.push(data.userBasicData);
        }
      }
    );
  }

  unFriend(data: AccountBasicData) {
    this.friendService
      .deleteOrCancelFriendRequest(data.idAccount)
      .subscribe((u) => {
        this.peopleYouMayKnow.push(data);
        this.friends.forEach((element, index) => {
          if (element.idAccount == data.idAccount) {
            this.friends.splice(index, 1);
          }
        });
      });
  }

  ngOnDestroy() {
    this.RespondToRequestSubject.unsubscribe();
    // this.openFriendsubscription.unsubscribe();
  }

  ngOnInit() {
    this.getPosts();
    this.getUserData();
    this.getFriends();
    this.getPeopleyouMayKnow();
    this.getRespondToRequestSubject();
  }
}
