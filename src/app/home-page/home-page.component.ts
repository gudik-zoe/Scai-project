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
  commentData: string;
  inputData: string;
  id: number;
  show: boolean = false;
  users: any[] = JSON.parse(localStorage.getItem('user'));
  currentUser: number = JSON.parse(localStorage.getItem('key'));
  error: boolean = false;

  getUserName(): string {
    return this.storageService.getName();
  }
  goToDescription(id: number): void {
    this.route.navigate(['/description', id]);
  }
  post(data: string): void {
    this.postService.post(data, this.foto);
    this.input = undefined;
    this.posted = true;
  }
  image(): string {
    return this.storageService.getImage();
  }

  uploadImage(event): void {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.foto = event.target.result;
      };
    }
  }

  like(id: number): void {
    this.postService.like(id);
  }

  showComments(id: number): void {
    this.postService.showComment(id);
  }
  commentLike(postId: number, commentId: number): void {
    if (this.postService.posts[postId].comments[commentId].likePressed) {
      this.postService.commentDisLike(postId, commentId);
    } else {
      this.postService.commentLike(postId, commentId);
    }
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
  // open(id: number): void {
  //   this.id = id;
  //   this.show = !this.show;
  // }

  // sendTo(id: number, data: string): void {
  //   if (
  //     this.inputData === '' ||
  //     this.inputData === ' ' ||
  //     this.inputData == null
  //   ) {
  //     this.error = true;
  //   } else {
  //     this.chat.sendTo(id, data);
  //     this.id = null;
  //     this.error = false;
  //     this.inputData = null;
  //     this.show = !this.show;
  //   }
  // // }
  // ok(): void {
  //   this.error = false;
  // }
  ngOnInit(): void {
    this.posts = this.postService.posts;
  }
}
