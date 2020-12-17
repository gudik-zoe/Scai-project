import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { CommentsService } from '../services/comments.service';
import { PostsService } from '../services/posts.service';
import { Comment } from '../models/comment';
import { PostLike } from '../models/postLike';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { CommentLike } from '../models/commentLike';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css'],
})
export class PostsContainerComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private accountService: AccountService,
    private commentService: CommentsService,
    private notificationService: NotificationService
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
      subject: 'post',
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
      async (data: Post) => {
        data.date = this.notificationService.timeCalculation(data.date);
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
        async (comment: Comment) => {
          comment.commentLike = [];
          comment.doneBy = {
            idAccount: this.userData.idAccount,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            profilePhoto: this.userData.profilePhoto,
          };
          comment.date = this.notificationService.timeCalculation(comment.date);

          data.post.comments.unshift(comment);
          this.commentText = null;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  likeCommentInParent(comment: Comment) {
    this.commentService.likeComment(comment.idComment).subscribe(
      (data: CommentLike) => {
        if (data) {
          comment.commentLike.push(data);
        } else {
          comment.commentLike.pop();
        }
      },
      (error) => {
        this.errorPhrase = error.error.message;
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
