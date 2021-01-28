import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { CommentsService } from '../services/comments.service';
import { PostsService } from '../services/posts.service';
import { Comment } from '../models/comment';
import { PostLike } from '../models/postLike';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { PageBasicData } from '../models/pageBasicData';
import { MatSnackBar } from '@angular/material/snack-bar';
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
        this.isAdmin ? false : true
      )
      .catch((errorMessage: string) => {
        this.showError(errorMessage);
      });
    data.post.comments.unshift(newComment);
  }

  async likeCommentInParent(comment: Comment) {
    const commentLike = await this.commentService
      .likeComment(comment.idComment, this.isAdmin ? false : true)
      .catch((errorMessage: string) => {
        this.showError(errorMessage);
      });
    if (commentLike) {
      comment.commentLike.push(commentLike);
    } else {
      comment.commentLike.pop();
    }
  }

  sharePost(post: Post) {
    const dataToPass = { post: post, userData: this.userData };
    let DeleteDialog = this.dialog.open(ShareDialogComponent, {
      data: dataToPass,
    });
    DeleteDialog.afterClosed().subscribe(async (data: FormData) => {
      const sharedPost = await this.postsService
        .resharePost(post, data)
        .catch((errorMessage: string) => {
          this.showError(errorMessage);
        });
      if (sharedPost && sharedPost.status != 2) {
        this.posts.unshift(sharedPost);
      }
    });
  }

  editPostInParent(post: Post) {
    let editDialog = this.dialog.open(EditDialogComponent, { data: post });
    editDialog.afterClosed().subscribe(async (newData: any) => {
      if (newData) {
        const updatedPost = await this.postsService
          .updatePost(post.idPost, newData.formData, newData.postWithImage)
          .catch((errorMessage) => {
            this.showError(errorMessage);
          });
        if (updatedPost) {
          post.text = updatedPost.text;
          post.image = updatedPost.image;
        }
      } else {
        this.showError("you haven't make any changes");
      }
    });
  }

  ngOnDestroy() {
    this.createPostSubscribtion.unsubscribe();
  }

  showError(errorMessage: string) {
    this.snackBar.open(errorMessage, '', { duration: 2500 });
  }

  ngOnInit() {
    this.getUserData();
    this.confirmCreatePost();
  }
}
