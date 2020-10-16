import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Account } from '../models/account';
import { postLike } from '../models/postLikes';
import { Post } from '../models/post';
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
  commentText: string;
  userImage;
  userData: Account;
  users: any;
  usersDetails = [];

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  deletePostInParent(id) {
    this.dbPosts = this.dbPosts.filter((item) => item.idPosts !== id);
  }
  async getPosts() {
    this.dbPosts = await this.postsService.getPosts();
    // console.log(this.dbPosts);
  }

  notifyParent(post: Post) {
    this.dbPosts.push(post);
  }

  likePost(post: Post) {
    this.postsService.likePost(post.idPosts).subscribe((data: postLike) => {
      if (data) {
        post.postLikes.push({ ...data });
      } else {
        post.postLikes.pop();
      }
    });
  }

  ngOnInit() {
    this.getPosts();
    this.getUserData();
    // this.getUsers()
  }
}
