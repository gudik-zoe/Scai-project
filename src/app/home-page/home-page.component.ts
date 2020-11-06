import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { PostLike } from '../models/postLike';
import { Account } from '../models/account';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private postService: PostsService,
    private accountService: AccountService
  ) {}
  likeBtn: boolean = false;
  input: string;
  foto: any;
  posted: boolean = false;
  editedComment: string;
  commentData: string = null;
  inputData: string;
  id: number;
  show: boolean = false;
  users;
  error: boolean = false;
  alertComponent: boolean = false;
  userData: Account;
  name: String;
  postLikes: PostLike;
  myImage;
  postImage;
  dbPosts;

  image() {
    return this.userData?.profilePhoto;
  }
  openDiv() {
    this.postService.alertComponent.next({
      userData: this.userData,
      openComponent: true,
    });
  }

  get() {
    console.log(this.userData.firstName);
  }

  getUsers() {
    this.accountService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  async getPosts() {
    this.dbPosts = await this.postService.getPosts();
  }

  ngOnInit(): void {
    this.getPosts();
    this.getUserData();
    this.postService.close.subscribe((data) => {
      this.alertComponent = data;
    });
  }
}
