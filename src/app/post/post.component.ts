import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { PostLike } from '../models/postLike';
import { AccountService } from '../services/account.service';
import { CommentsService } from '../services/comments.service';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';
import { Comment } from '../models/comment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  imgUrl: string = environment.rootUrl + 'files/';
  @Input() post: Post;
  @Input() userData: AccountBasicData;
  @Input() commentText: string;
  @Input() status: string;

  @Output() testOutput = new EventEmitter<Post>();
  @Output() deletePostEvent = new EventEmitter<number>();
  @Output() likePostEvent = new EventEmitter<Post>();
  @Output() commentPostEvent = new EventEmitter<any>();
  @Output() editPostEvent = new EventEmitter<any>();
  @Output() sharePostEvent = new EventEmitter<any>();

  openCommentsList: boolean = false;
  editCommentOn: boolean;
  commentId: number;

  editCommentValue: string;
  editMode: boolean = false;
  postEditText: string;
  hideImage: boolean = false;
  myImage;
  postImage;
  imageString: string;
  errorPhrase: string = '';

  constructor(
    private commentService: CommentsService,
    private route: Router,
    private notificationService: NotificationService
  ) {}

  like(post: Post) {
    this.likePostEvent.emit(post);
  }

  comment(post: Post, commentText: string) {
    if (commentText == undefined || !commentText.trim()) {
      this.errorPhrase = 'cannot add an empty comment';
      commentText = '';
    } else {
      this.errorPhrase = '';
      this.commentPostEvent.emit({ post, commentText });
    }
  }

  toDescription(id: number) {
    this.route.navigate(['/description', id]);
  }

  // sharePost(post) {
  //   this.postsService.sharePostComponent.next({
  //     post,
  //     openComponent: true,
  //     userData: this.userData,
  //     doneBy: post.doneBy,
  //   });
  // }

  sharePost(post: Post) {
    this.sharePostEvent.emit(post);
  }

  editPost(post: Post) {
    this.editPostEvent.emit(post);
  }

  deletePost(id: number) {
    this.deletePostEvent.emit(id);
  }

  getLike() {
    if (this.userData) {
      return !!this.post.postLikes.find(
        (item: PostLike) => item.postLikeCreatorId == this.userData.idAccount
      );
    }
    return false;
  }

  getComment() {
    if (this.userData) {
      const check = this.post.comments.find(
        (item) => item.commentCreatorId == this.userData.idAccount
      );
      return check;
    }
    return false;
  }

  goToDescription(id: number): void {
    this.route.navigate(['/description', id]);
  }

  openComments() {
    this.openCommentsList = !this.openCommentsList;
  }

  editComment(text: string, id: number) {
    this.commentId = id;
    this.editCommentOn = !this.editCommentOn;
    this.editCommentValue = text;
  }

  confirmEditComment(comment: Comment, newComment: string) {
    if (newComment == undefined || !newComment.trim()) {
      this.errorPhrase = 'cannot add an empty comment';
    } else if (newComment.trim() == comment.text) {
      this.editCommentOn = false;
    } else {
      this.commentService
        .updateComment(comment.idComment, newComment.trim())
        .subscribe((data: Comment) => {
          this.editCommentOn = false;
          comment.text = data.text;
          this.errorPhrase = '';
        });
    }
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe((data) => {
      this.post.comments = this.post.comments.filter(
        (item) => item.idComment !== id
      );
    });
  }

  async getDate() {
    this.post.date = await this.notificationService.timeCalculation(this.post);
  }

  ngOnInit() {
    this.getDate();
  }
}
