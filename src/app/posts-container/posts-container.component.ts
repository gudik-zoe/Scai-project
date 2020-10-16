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
import { NotificationService } from '../services/notification.service';
import { Comment } from '../models/comment';

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
    private friendService: FriendsService,
    private notificationService: NotificationService
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

  sendNotification(notification) {
    if (notification.notCreator !== notification.notReceiver) {
      this.notificationService
        .addNotification(notification)
        .subscribe((data) => {
          console.log(data);
        });
    }
  }

  notifyParent(post: Post) {
    this.dbPosts.push(post);
  }

  likePost(post: Post) {
    const notification = {
      notCreator: this.userData.idAccount,
      action: 'like',
      notReceiver: post.accountIdAccount,
      postId: post.idPosts,
      date: new Date(),
      seen: false,
    };
    this.postsService.likePost(post.idPosts).subscribe((data: postLike) => {
      if (data) {
        this.sendNotification(notification);
        post.postLikes.push({ ...data });
      } else {
        post.postLikes.pop();
      }
    });
  }

  commentPost(data) {
    const notification = {
      notCreator: this.userData.idAccount,
      action: 'comment',
      notReceiver: data.post.accountIdAccount,
      postId: data.post.idPosts,
      date: new Date(),
      seen: false,
    };
    this.commentService
      .addCommment(data.post.idPosts, data.commentText)
      .subscribe((comment: Comment) => {
        comment.doneBy = {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          profilePhoto: this.userData.profilePhoto,
          idAccount: this.userData.idAccount,
        };
        data.post.comments.push(comment);
        this.commentText = null;
        this.sendNotification(notification);
      });
  }

  ngOnInit() {
    this.getPosts();
    this.getUserData();
  }
}
