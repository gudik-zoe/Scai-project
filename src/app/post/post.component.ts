import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountModel } from '../models/account';
import { editPost } from '../models/editPostInt';
import { PostsModel } from '../models/posts';
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
  @Input() dbPosts;

  @Output() testOutput = new EventEmitter<PostsModel>();
  @Output() deletePostEvent = new EventEmitter<number>();

  commentText: string;
  liked: boolean;
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

  like(id: number, accountPostId: number) {
    this.postsService.likePost(id).subscribe((data) => {
      if (data) {
        this.liked = true;
        this.post.postLikes.push({
          data,
        });
        const notification = {
          notCreator: this.userData.idAccount,
          action: 'like',
          notReceiver: accountPostId,
          postId: id,
          date: new Date(),
          seen: false,
        };
        console.log(notification);
        this.notificationService
          .addNotification(notification)
          .subscribe((data) => {
            console.log(data);
          });
        // this.testOutput.emit({ likeObject: data });
      } else {
        this.liked = false;
        this.post.postLikes.pop();
      }
    });
  }

  comment(post, commentText: string) {
    const notification = {
      notCreator: this.userData.idAccount,
      action: 'comment',
      notReceiver: post.accountIdAccount,
      postId: post.idPosts,
      date: new Date(),
      seen: false,
    };
    this.commentService
      .addCommment(post.idPosts, commentText)
      .subscribe((data: any) => {
        (data.doneBy = {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          profilePhoto: this.userData.profilePhoto,
          idAccount: this.userData.idAccount,
        }),
          this.post.comments.push(data);
        this.commentText = null;
        this.notificationService
          .addNotification(notification)
          .subscribe((data) => {
            console.log(data);
          });
      });
  }

  deleteImage() {
    this.hideImage = true;
    this.imageString = null;
  }

  editPost(post) {
    this.editMode = !this.editMode;
    this.postEditText = post.text;
    this.imageString = post.image;
  }

  confirmEditPost(post) {
    post.image = this.imageString || null;
    post.text = this.postEditText;
    this.postsService.updatePost(post).subscribe((data: PostModule) => {
      this.postImage = null;
      this.hideImage = false;
      this.editMode = false;
    });
  }
  deletePost(id: number) {
    this.postsService.deletePost(id).subscribe((data) => {
      this.deletePostEvent.emit(id);
    });
  }

  uploadImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myImage = file;
      const formData = new FormData();
      formData.append('file', this.myImage);
      this.imageString = this.myImage.name;
      this.http
        .post('http://localhost:8080/upload', formData)
        .subscribe((data) => {
          console.log(data);
        });
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.postImage = event.target.result;
      };
    }
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
