import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { PostLike } from '../models/postLike';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment';
import { FriendsService } from '../services/friends.service';
import { Relationship } from '../models/relationship';

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
  userData: Account;
  loggedInUserData;
  name: String;
  postLikes: PostLike;
  myImage;
  postImage;
  dbPosts;
  friends: Relationship[];
  imgUrl: string = environment.rootUrl + 'files/';

  image() {
    return this.userData?.profilePhoto;
  }

  get() {
    console.log(this.userData.firstName);
  }

  async getUsers() {
    this.users =
      this.accountService.users || (await this.accountService.getUsers());
    console.log(this.users);
  }

  async getFriends() {
    this.friends = await this.friendsService.getMyFriends();
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
    console.log(this.userData);
  }

  openDiv(event: any) {
    this.postService.alertComponent.next({
      userData: this.userData,
      openComponent: true,
    });
  }

  async getPosts() {
    this.dbPosts = await this.postService.getPosts();
  }

  ngOnInit() {
    this.getPosts();
    this.getUserData();
    this.getUsers();
    this.getFriends();
    this.postService.close.subscribe((data) => {
      this.alertComponent = data;
    });
  }
}
