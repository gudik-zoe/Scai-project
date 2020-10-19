import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EditPost } from '../models/editPostInt';
import { Post } from '../models/post';
import { PostLike } from '../models/postLike';
import { AccountService } from '../services/account.service';
import { CommentsService } from '../services/comments.service';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';
import { PostModule } from './post.module';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  imgUrl: string = environment.rootUrl + '/files/';
  @Input() post;
  @Input() userData;
  @Input() posters;
  @Input() i;
  @Input() usersDetails;
  @Input() commentText;

  @Output() testOutput = new EventEmitter<Post>();
  @Output() deletePostEvent = new EventEmitter<number>();
  @Output() likePostEvent = new EventEmitter<Post>();
  @Output() commentPostEvent = new EventEmitter<any>();
  @Output() editPostEvent = new EventEmitter<any>();

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

  constructor(
    private postsService: PostsService,
    private commentService: CommentsService,
    private route: Router,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  like(post: Post) {
    this.likePostEvent.emit(post);
  }

  comment(post: Post, commentText: string) {
    this.commentPostEvent.emit({ post, commentText });
  }

  toDescription(id: number) {
    this.route.navigate(['/description', id]);
  }

  sharePost(post) {
    this.postsService.sharePostComponent.next({
      post,
      openComponent: true,
      userData: this.userData,
      doneBy: post.doneBy,
    });
    // const thePost = {
    //   postOriginalId: post.idPost,
    // };
    // this.postsService.addPost(thePost).subscribe((data) => {
    //   console.log(data);
    // });
  }

  editPost(post: Post) {
    // this.editPostEvent.emit({ post, openComponent: true });
    this.postsService.editPostComponent.next({
      post,
      openComponent: true,
      userData: this.userData,
    });
  }

  deletePost(id: number) {
    this.postsService.deletePost(id).subscribe((data) => {
      this.deletePostEvent.emit(id);
    });
  }

  getLike() {
    if (this.userData) {
      return !!this.post.postLikes.find(
        (item: PostLike) => item.postLikeCreatorId == this.userData.idAccount
      );
    }
    return false;
  }

  getComment(): boolean {
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

  editComment(text, id) {
    this.commentId = id;
    this.editCommentOn = !this.editCommentOn;
    this.editCommentValue = text;
  }

  confirmEditComment(comment) {
    comment.text = this.editCommentValue;
    this.commentService
      .updateComment(comment.postsIdPost, comment)
      .subscribe((data) => {
        this.editCommentOn = false;
      });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe((data) => {
      this.post.comments = this.post.comments.filter(
        (item) => item.idComment !== id
      );
    });
  }

  ngOnInit() {}
}
