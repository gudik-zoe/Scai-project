import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { PagesService } from '../services/pages.service';
import { PostsService } from '../services/posts.service';
import { StorageService } from '../services/storage.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { FriendsService } from '../services/friends.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  posts: any[] = [];
  userFriends: any[] = JSON.parse(localStorage.getItem('user'));
  currentUserId: number = JSON.parse(localStorage.getItem('key'));
  constructor(
    private _sanitizer: DomSanitizer,
    private http: HttpClient,
    private postService: PostsService,
    private accountService: AccountService,
    private route: Router,
    private auth: AuthService,
    private storageService: StorageService,
    private chatService: ChatService,
    private pagesService: PagesService,
    private commentService: CommentsService,
    private friendsService: FriendsService
  ) {}
  likeBtn: boolean = false;
  input: string;
  foto: any;
  posted: boolean = false;
  editedComment: string;
  commentData: string = null;
  inputData: string;
  id: number;
  show: boolean = false;
  users: any[] = JSON.parse(localStorage.getItem('user'));
  currentUser: number = JSON.parse(localStorage.getItem('key'));
  error: boolean = false;
  alertComponent: boolean = false;
  userData;
  name: String;
  dbPosts;
  postLikes;
  myImage;
  firstName;

  goToDescription(id: number): void {
    // this.route.navigate(['/description', id]);
  }

  // getUserName() {
  //   return this.accountService.userData?.firstName;
  // }

  getPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.dbPosts = data;
      console.log(data);
    });
  }

  getMyPosts() {
    this.postService.getPostsByAccountId().subscribe((data) => {
      console.log(data);
    });
  }

  likePost(postId) {
    this.postService.likePost(postId).subscribe((data) => {
      console.log(data);
    });
  }

  getPostLikes(postId) {
    this.postService.getPostLikes(postId).subscribe((data) => {
      console.log(data);
    });
  }

  getPostLikers(postId) {
    this.postService.getPostLikers(postId).subscribe((data) => {
      console.log(data);
    });
  }

  addPost() {
    this.postService.addPost().subscribe((data) => {
      console.log(data);
    });
  }

  deletePost(postId) {
    this.postService.deletePost(postId).subscribe((data) => {
      console.log(data);
    });
  }

  getCommentsByPostId(postId) {
    this.commentService.getCommentsByPostId(postId).subscribe((data) => {
      console.log(data);
    });
  }

  addComment(postId) {
    this.commentService.addCommment(postId).subscribe((data) => {
      console.log(data);
    });
  }

  likeComment(commentId) {
    this.commentService.likeComment(commentId).subscribe((data) => {
      console.log(data);
    });
  }

  getCommentLikes(commentId) {
    this.commentService.getCommentLikes(commentId).subscribe((data) => {
      console.log(data);
    });
  }

  getCommentLikers(commentId) {
    this.commentService.getCommentLikers(commentId).subscribe((data) => {
      console.log(data);
    });
  }

  editComment(postId, commentId) {
    this.commentService.updateComment(postId, commentId).subscribe((data) => {
      console.log(data);
    });
  }

  deleteComment(commentId) {
    this.commentService.deleteComment(commentId).subscribe((data) => {
      console.log(data);
    });
  }

  image() {
    return this.userData?.profilePhoto;
  }
  openDiv(): void {
    this.alertComponent = true;
  }

  get() {
    console.log(this.userData.firstName);
  }

  like(id: number): void {
    this.postService.like(id);
  }

  showComments(id: number): void {
    this.postService.showComment(id);
  }
  commentLike(postId: number, commentId: number): void {
    this.postService.commentLike(postId, commentId);
  }

  edit(postId: number, commentId: number, editedComment: string): void {
    this.postService.edit(postId, commentId, editedComment);
  }

  comment(id: number, comment: string): void {
    this.postService.comment(id, comment);
    this.commentData = null;
  }
  removeComment(postId: number, commentId: number): void {
    this.postService.removeComment(postId, commentId);
  }
  share(id: number): void {
    this.postService.share(id);
  }

  callingThePosts() {
    // this.postService.getPosts().subscribe(data => {
    // })
  }

  uploadImage() {}

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = this._sanitizer.bypassSecurityTrustResourceUrl(
          reader.result.toString()
        );
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  theAccountObject;
  imageToShow;
  ngOnInit(): void {
    this.getPosts();
    console.log(this.dbPosts);
    this.accountService.getData().subscribe((data) => {
      this.theAccountObject = data;
      this.http
        .get(
          'http://localhost:8080/files/' + this.theAccountObject.profilePhoto,
          {
            responseType: 'blob',
          }
        )
        .subscribe((data) => {
          this.createImageFromBlob(data);
          console.log(this.theAccountObject.profilePhoto);
        });
    });

    // this.postService.getPosts().subscribe((data) => {
    //   this.dbPosts = data;
    // });
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
    });
  }
}
