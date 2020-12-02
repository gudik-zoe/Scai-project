import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css'],
})
export class PostsContainerComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private accountService: AccountService,
    private commentService: CommentsService
  ) {}
  @Input() posts: Post[];
  @Input() status: string;
  userData: AccountBasicData;
  commentText: string;
  errorPhrase: string;
  public deleteSubscribtion: Subscription;
  public createPostSubscribtion: Subscription;
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  deletePostInParent(id: number) {
    this.postsService.deletePostSubject.next({
      openComponent: true,
      postId: id,
    });
  }

  confirmDeletePost() {
    this.deleteSubscribtion = this.postsService.confirmPostDeleting.subscribe(
      (data) => {
        if (data.delete) {
          this.postsService.deletePost(data.postId).subscribe(
            () => {
              this.posts = this.posts.filter(
                (item: Post) => item.idPost !== data.postId
              );
            },
            (error) => {
              this.errorPhrase = error.error.message;
            }
          );
        }
      }
    );
  }

  confirmCreatePost() {
    this.createPostSubscribtion = this.postsService.confirmCreatePost.subscribe(
      (data: Post) => {
        this.posts.unshift(data);
      }
    );
  }

  likePostInParent(post: Post) {
    this.postsService.likePost(post.idPost).subscribe(
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
          data.post.comments.unshift(comment);
          this.commentText = null;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  sharePost(data: Post) {
    this.postsService.sharePostComponent.next({
      post: data,
      openComponent: true,
      userData: this.userData,
      doneBy: data.doneBy,
    });
  }

  editPostInParent(data: Post) {
    this.postsService.editPostComponent.next({
      post: data,
      openComponent: true,
      userData: this.userData,
    });
  }
  ngOnDestroy() {
    this.deleteSubscribtion.unsubscribe();
    this.createPostSubscribtion.unsubscribe();
  }

  ngOnInit() {
    this.getUserData();
    this.confirmDeletePost();
    this.confirmCreatePost();
  }
}
