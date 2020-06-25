import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../log-in/auth.service';
import { StorageService } from '../storage.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  posts = [];
  userFriends = JSON.parse(localStorage.getItem('user'));
  currentUserId = JSON.parse(localStorage.getItem('key'));

  data;
  constructor(
    private postService: PostsService,
    private route: Router,
    private auth: AuthService,
    private storageService: StorageService,
    private chat: ChatService
  ) {}
  likeBtn = false;
  input;
  foto;
  preview;
  posted = false;
  editedComment;
  inputData;
  id;
  show = false;
  users = JSON.parse(localStorage.getItem('user'));
  currentUser = JSON.parse(localStorage.getItem('key'));
  messageTo;
  sentMessage;
  error = false;

  getUserName() {
    return this.storageService.getName();
  }
  goToDescription(id) {
    this.route.navigate(['/description', id]);
  }
  post(data) {
    this.postService.post(data, this.foto);
    this.input = undefined;
    this.posted = true;
  }
  image() {
    return this.storageService.getImage();
  }

  uploadImage(event) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.foto = event.target.result;
        this.preview = this.foto;
      };
    }
  }

  like(id) {
    this.postService.like(id);
  }

  showComments(id) {
    this.postService.showComment(id);
  }
  commentLike(postId, commentId) {
    if (this.postService.posts[postId].comments[commentId].likePressed) {
      this.postService.commentDisLike(postId, commentId);
    } else {
      this.postService.commentLike(postId, commentId);
    }
  }

  edit(postId, commentId, editedComment) {
    this.postService.edit(postId, commentId, editedComment);
  }

  comment(id, comment) {
    this.postService.comment(id, comment.value);
    comment.value = '';
  }
  removeComment(postId, commentId) {
    this.postService.removeComment(postId, commentId);
  }
  share(id) {
    this.postService.share(id);
  }
  open(id) {
    this.id = id;
    this.show = !this.show;
  }

  sendTo(id, data) {
    if (
      this.inputData === '' ||
      this.inputData === ' ' ||
      this.inputData == null
    ) {
      this.error = true;
    } else {
      this.chat.send(id, data);
      this.id = null;
      this.error = false;
      this.inputData = null;
      this.show = !this.show;
    }
  }
  ok() {
    this.error = false;
  }
  ngOnInit() {
    this.posts = this.postService.posts;
  }
}
