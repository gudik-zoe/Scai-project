import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { PostLike } from '../models/postLike';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment';
import { FriendsService } from '../services/friends.service';
import { Relationship } from '../models/relationship';
import { AccountBasicData } from '../models/accountBasicData';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private postService: PostsService,
    private accountService: AccountService,
    private friendsService: FriendsService
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
  image() {
    return this.userData?.profilePhoto;
  }

  async getFriends() {
    this.friends =
      this.accountService.myFriends ||
      (await this.accountService.getAccountFriends());
  }
  async getPeopleyouMayKnow() {
    this.peopleYouMayKnow =
      this.accountService.peopleYouMayKnow ||
      (await this.accountService.getPeopleYouMayKnow());
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

  ngOnInit() {
    this.getPosts();
    this.getUserData();
    this.getFriends();
    this.getPeopleyouMayKnow();
  }
}
