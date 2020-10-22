import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Account } from '../models/account';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { CommentsService } from '../services/comments.service';
import { FriendsService } from '../services/friends.service';
import { PostsService } from '../services/posts.service';
import { NotificationService } from '../services/notification.service';
import { Comment } from '../models/comment';
import { PostLike } from '../models/postLike';
import { AccountBasicData } from '../models/accountBasicData';

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
  @Input() posts;
  commentText: string;
  userImage;
  userData: Account;
  usersDetails = [];

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  deletePostInParent(id) {
    this.posts = this.posts.filter((item) => item.idPost !== id);
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

  likePostInParent(post: Post) {
    const notification = {
      notCreator: this.userData.idAccount,
      action: 'liked',
      notReceiver: post.postCreatorId,
      relatedPostId: post.idPost,
      date: new Date().getTime(),
      seen: false,
    };
    this.postsService.likePost(post.idPost).subscribe((data: PostLike) => {
      if (data) {
        this.sendNotification(notification);
        post.postLikes.push({ ...data });
      } else {
        post.postLikes.pop();
      }
    });
  }

  commentPostInParent(data) {
    const notification = {
      notCreator: this.userData.idAccount,
      action: 'commented on',
      notReceiver: data.post.postCreatorId,
      relatedPostId: data.post.idPost,
      date: new Date().getTime(),
      seen: false,
    };
    this.commentService
      .addCommment(data.post.idPost, data.commentText)
      .subscribe((comment: Comment) => {
        comment.doneBy = {
          idAccount: this.userData.idAccount,
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          profilePhoto: this.userData.profilePhoto,
        };
        data.post.comments.push(comment);
        this.commentText = null;
        this.sendNotification(notification);
      });
  }

  editPostInParent(data) {
    this.postsService.editPostComponent.next({
      post: data,
      openComponent: true,
      userData: this.userData,
    });
  }

  ngOnInit() {
    this.getUserData();
  }
}
