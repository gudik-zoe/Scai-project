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
  users;
  error: boolean = false;
  alertComponent: boolean = false;
  userData;
  name: String;
  dbPosts;
  postLikes;
  myImage;
  firstName;
  theAccountObject;
  imageToShow;
  postImage;

  // getUserName() {
  //   return this.accountService.userData?.firstName;
  // }

  // getPosts() {
  //   this.postService.getPosts().subscribe((data) => {
  //     this.dbPosts = data;
  //   });
  // }

  // getMyPosts() {
  //   this.postService.getPostsByAccountId().subscribe((data) => {
  //     console.log(data);
  //   });
  // }

  // likePost(postId) {
  //   this.postService.likePost(postId).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

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

  // addComment(postId) {
  //   this.commentService.addCommment(postId).subscribe((data) => {
  //     console.log(data);
  //   });
  // }

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
  openDiv() {
    this.postService.close.next(true);
  }

  get() {
    console.log(this.userData.firstName);
  }

  callingThePosts() {
    // this.postService.getPosts().subscribe(data => {
    // })
  }

  uploadImage() {}

  // private async getUserData() {
  //   const { userData, image } = await this.accountService.getUserImageAndData();
  //   this.theAccountObject = userData;
  //   this.imageToShow = image;
  // }
  getUsers() {
    this.accountService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  ngOnInit(): void {
    this.getUserData();
    this.postService.close.subscribe((data) => {
      this.alertComponent = data;
    });
  }
}
