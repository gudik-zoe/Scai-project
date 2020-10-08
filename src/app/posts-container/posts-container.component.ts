import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AccountModel } from '../models/account';
import { PostsModel } from '../models/posts';
import { AccountService } from '../services/account.service';
import { CommentsService } from '../services/comments.service';
import { FriendsService } from '../services/friends.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css'],
})
export class PostsContainerComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private postsService: PostsService,
    private accountService: AccountService,
    private commentService: CommentsService,
    private _sanitizer: DomSanitizer,
    private route: Router,
    private friendService: FriendsService
  ) {}
  dbPosts;
  commentText;
  userImage;
  userData: AccountModel;
  users: any;
  usersDetails = [];

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  getUsers() {
    this.accountService.getUsers().subscribe((data) => {
      this.users = data;
      for (let i of this.users) {
        this.accountService
          .getBasicAccountDetails(i.idAccount)
          .subscribe((u) => {
            this.usersDetails.push(u);
          });
      }
    });
  }

  async getPosts() {
    this.dbPosts = await this.postsService.getPosts2();
  }

  notifyParent(post: PostsModel) {
    this.dbPosts.push(post);
  }

  ngOnInit() {
    this.getPosts();
    this.getUserData();
    this.getUsers();
  }
}
