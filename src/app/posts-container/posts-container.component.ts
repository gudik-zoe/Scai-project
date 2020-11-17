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
  @Input() posts: Post[];
  userData: Account;
  commentText: string;

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  deletePostInParent(id: number) {
    this.postsService.deletePostSubject.next({
      openCompoenent: true,
      postId: id,
    });
    // this.postsService.deletePost(id).subscribe((data) => {
    //   this.posts = this.posts.filter((item: Post) => item.idPost !== id);
    // });
  }

  likePostInParent(post: Post) {
    this.postsService.likePost(post).subscribe(
      (data: PostLike) => {
        if (data) {
          post.postLikes.push({ ...data });
        } else {
          post.postLikes.pop();
        }
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  commentPostInParent(data) {
    this.commentService
      .addCommment(data.post, data.commentText.trim())
      .subscribe(
        (comment: Comment) => {
          comment.doneBy = {
            idAccount: this.userData.idAccount,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            profilePhoto: this.userData.profilePhoto,
          };
          data.post.comments.push(comment);
          this.commentText = null;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  editPostInParent(data: Post) {
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
