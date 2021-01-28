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
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

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
  postToShare: Post;
  public createPostSubscribtion: Subscription;

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  deletePostInParent(post: Post) {
    let DeleteDialog = this.dialog.open(DeleteDialogComponent, {
      data: post.idPost,
    });
    DeleteDialog.afterClosed().subscribe((result: boolean) => {
      if (result) {
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
        data ? post.postLikes.push({ ...data }) : post.postLikes.pop();
      },
      (error) => {
        this.snackBar.open(error.error.message, '', { duration: 2000 });
      }
    );
  }

  async commentPostInParent(data) {
    const newComment = await this.commentService
      .addCommment(
        data.post,
        data.commentText.trim(),
        this.page && this.page.pageCreatorId == this.userData.idAccount
          ? false
          : true
      )
      .catch((errorMessage: string) => {
        this.snackBar.open(errorMessage, '', { duration: 3000 });
      });

    data.post.comments.unshift(newComment);
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

  sharePost(post: Post) {
    const dataToPass = { post: post, userData: this.userData };
    let DeleteDialog = this.dialog.open(ShareDialogComponent, {
      data: dataToPass,
    });
    DeleteDialog.afterClosed().subscribe(
      async (data: FormData) => {
        const sharedPost = await this.postsService.resharePost(post, data);
        if (sharedPost.status != 2) {
          this.posts.unshift(sharedPost);
        }
      },
      (error) => {
        this.snackBar.open(error.error.message, '', { duration: 2000 });
      }
    );
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

  editPostInParent(post: Post) {
    let editDialog = this.dialog.open(EditDialogComponent, { data: post });
    editDialog.afterClosed().subscribe((newData: any) => {
      console.log(newData);
      if (newData) {
        this.postsService
          .updatePost(post.idPost, newData.formData, newData.postWithImage)
          .subscribe(
            (data: Post) => {
              post.image = data.image;
              post.text = data.text;
            },
            (error) => {
              this.snackBar.open(error.error.message, '', { duration: 2000 });
            }
          );
      } else {
        this.snackBar.open("you haven't make any changes", '', {
          duration: 2000,
        });
      }
    });
  }

  ngOnDestroy() {
    this.createPostSubscribtion.unsubscribe();
  }

  ngOnInit() {
    this.getUserData();
    this.confirmCreatePost();
  }
}
