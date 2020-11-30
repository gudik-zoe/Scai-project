import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { Component, OnDestroy, OnInit, Sanitizer } from '@angular/core';
import { PostLike } from '../models/postLike';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment';
import { FriendsService } from '../services/friends.service';
import { Relationship } from '../models/relationship';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';

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

  input: string;
  foto: any;
  posted: boolean = false;
  editedComment: string;
  commentData: string = null;
  inputData: string;
  id: number;
  show: boolean = false;
  users: Account[];
  error: boolean = false;
  alertComponent: boolean = false;
  userData: AccountBasicData;
  loggedInUserData;
  name: String;
  postLikes: PostLike;
  myImage;
  postImage;
  dbPosts;
  friends: AccountBasicData[];
  imgUrl: string = environment.rootUrl + 'files/';
  peopleYouMayKnow: AccountBasicData[];
  RespondToRequestSubject: Subscription;
  UnfriendSubject: Subscription;
  image() {
    return this.userData?.profilePhoto;
  }

  async getFriends() {
    this.friends = await this.accountService.getAccountFriends();
  }
  async getPeopleyouMayKnow() {
    this.peopleYouMayKnow = await this.accountService.getPeopleYouMayKnow();
  }

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

  getUnfriendSubject() {
    this.UnfriendSubject = this.friendService.unfriendSubject.subscribe(
      (data) => {
        this.friends = this.friends.filter((item: AccountBasicData) => {
          item.idAccount != data.idAccount;
          this.peopleYouMayKnow.push(data);
        });
      }
    );
  }

  ngOnDestroy() {
    this.RespondToRequestSubject.unsubscribe();
    this.UnfriendSubject.unsubscribe();
  }

  ngOnInit() {
    this.getPosts();
    this.getUserData();
    this.getFriends();
    this.getPeopleyouMayKnow();
    this.getRespondToRequestSubject();
    this.getUnfriendSubject();
  }
}
