import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../log-in/auth.service';
import { StorageService } from '../storage.service';
import { ChatService } from '../chat.service';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {
  posts = [];
  userFriends = JSON.parse(localStorage.getItem('user'));
  currentUserId = JSON.parse(localStorage.getItem('key'));
  constructor(
    private postService: PostsService,
    private route: Router,
    private auth: AuthService,
    private storageService: StorageService,
    private chat: ChatService,
    private pagesService: PagesService
  ) {}
  likeBtn: boolean = false;
  // message = false;
  input: string;
  foto: any;
  // imagePreview;
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
  getUserName(): string {
    return this.storageService.getName();
  }
  goToDescription(id: number): void {
    this.route.navigate(['/description', id]);
  }

  image(): string {
    return this.storageService.getImage();
  }
  openDiv() {
    this.alertComponent = true;
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

  ngOnInit(): void {
    this.posts = this.postService.posts;
    this.postService.close.subscribe((data) => {
      this.alertComponent = data;
    });
  }
}
