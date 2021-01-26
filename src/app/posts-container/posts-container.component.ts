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
import { PagesService } from '../services/pages.service';
import { PageBasicData } from '../models/pageBasicData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { share } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

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
    private notificationService: NotificationService,
    private pageService: PagesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  @Input() posts: Post[];
  @Input() status: string;
  @Input() page: PageBasicData;
  @Input() isAdmin: boolean;
  userData: AccountBasicData;
  commentText: string;
  errorPhrase: string;
  postId: number;
  postToEditComponent: Post;
  postToShare: Post;
  public createPostSubscribtion: Subscription;

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  deletePostInParent(post: Post) {
    let dialog = this.dialog.open(DeleteDialogComponent, { data: post.idPost });

    dialog.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.postsService.deletePost(post.idPost).subscribe(
          () => {
            this.posts = this.posts.filter(
              (item: Post) => item.idPost != post.idPost
            );
            this.snackBar.open('post has been deleted', '', { duration: 2000 });
          },
          (error) => {
            this.errorPhrase = error.error.message;
          }
        );
      }
    });
  }

  confirmCreatePost() {
    this.createPostSubscribtion = this.postsService.confirmCreatePost.subscribe(
      (data: Post) => {
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
    if (this.page && this.page.pageCreatorId == this.userData.idAccount) {
      this.pageService
        .addComment(data.post.idPost, data.commentText.trim())
        .subscribe(
          (comment: Comment) => {
            comment.commentLike = [];
            comment.doneByPage = {
              idPage: this.page.idPage,
              name: this.page.name,
              profilePhoto: this.page.profilePhoto,
              coverPhoto: this.page.coverPhoto,
            };
            comment.date = this.notificationService.timeCalculation(
              comment.date
            );
            data.post.comments.unshift(comment);
            this.commentText = null;
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      this.commentService
        .addCommment(data.post, data.commentText.trim())
        .subscribe(
          (comment: Comment) => {
            comment.commentLike = [];
            comment.doneBy = {
              ...this.userData,
            };
            comment.date = this.notificationService.timeCalculation(
              comment.date
            );
            data.post.comments.unshift(comment);
            this.commentText = null;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  likeCommentInParent(comment: Comment) {
    if (!this.isAdmin) {
      console.log('user like');
      this.commentService.likeComment(comment.idComment).subscribe(
        (data: CommentLike) => {
          if (data) {
            data.doneBy = {
              ...this.userData,
            };
            comment.commentLike.push(data);
          } else {
            comment.commentLike.pop();
          }
        },
        (error) => {
          this.errorPhrase = error.error.message;
        }
      );
    } else {
      this.pageService.likeComment(comment.idComment).subscribe(
        (data: CommentLike) => {
          if (data) {
            data.doneByPage = { ...this.page };
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
  }

  sharePost(data: Post) {
    this.postToShare = data;
  }

  async confirmSharePost(data) {
    if (!data) {
      this.postToShare = undefined;
    } else {
      const sharedPost = await this.postsService.resharePost(
        data.post,
        data.formData
      );
      if (sharedPost.status != 2) {
        this.posts.unshift(sharedPost);
      }
      this.postToShare = undefined;
    }
  }

  editPostInParent(data: Post) {
    this.postToEditComponent = data;
  }

  confirmEditPost(data) {
    if (!data) {
      this.postToEditComponent = null;
    } else if (data.userPost) {
      this.postsService
        .updatePost(data.idPost, data.formData, data.postWithImage)
        .subscribe(
          (theEditedPost: Post) => {
            for (let post of this.posts) {
              if (post.idPost == theEditedPost.idPost) {
                post.image = theEditedPost.image;
                post.text = theEditedPost.text;
                this.postToEditComponent = undefined;
              }
            }
          },
          (error) => {
            this.errorPhrase = error.error.message;
          }
        );
    } else if (!data.userPost) {
      this.pageService
        .editPost(data.idPost, data.formData, data.postWithImage)
        .subscribe(
          (theEditedPagePost: Post) => {
            for (let post of this.posts) {
              if (post.idPost == theEditedPagePost.idPost) {
                post.image = theEditedPagePost.image;
                post.text = theEditedPagePost.text;
                this.postToEditComponent = undefined;
              }
            }
          },
          (error) => {
            this.errorPhrase = error.error.message;
          }
        );
    }
  }

  ngOnDestroy() {
    this.createPostSubscribtion.unsubscribe();
  }

  ngOnInit() {
    this.getUserData();
    this.confirmCreatePost();
  }
}
