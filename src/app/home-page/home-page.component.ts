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
    let newMessage = this.auth.localStorageArray[id].messages;

    newMessage.push({
      image: this.auth.localStorageArray[this.currentUser].image,
      message: data,
      id: this.currentUser,
    });

    let userMessage = this.auth.localStorageArray[this.currentUser].messages;
    userMessage.push({
      image: this.auth.localStorageArray[this.currentUser].image,
      message: data,
      to: this.auth.localStorageArray[id].image,
    });
    this.messageTo = {
      image: this.auth.localStorageArray[id].image,
      name: this.auth.localStorageArray[id].name,
      lastName: this.auth.localStorageArray[id].lastName,
      email: this.auth.localStorageArray[id].email,
      password: this.auth.localStorageArray[id].password,
      confirmPassword: this.auth.localStorageArray[id].confirmPassword,
      gender: this.auth.localStorageArray[id].gender,
      study: this.auth.localStorageArray[id].study,
      wentTo: this.auth.localStorageArray[id].wentTo,
      livesIn: this.auth.localStorageArray[id].livesIn,
      from: this.auth.localStorageArray[id].from,
      messages: newMessage,
      posts: this.auth.localStorageArray[id].posts,
    };

    this.sentMessage = {
      image: this.auth.localStorageArray[this.currentUser].image,
      name: this.auth.localStorageArray[this.currentUser].name,
      lastName: this.auth.localStorageArray[this.currentUser].lastName,
      email: this.auth.localStorageArray[this.currentUser].email,
      password: this.auth.localStorageArray[this.currentUser].password,
      confirmPassword: this.auth.localStorageArray[this.currentUser]
        .confirmPassword,
      gender: this.auth.localStorageArray[this.currentUser].gender,
      study: this.auth.localStorageArray[this.currentUser].study,
      wentTo: this.auth.localStorageArray[this.currentUser].wentTo,
      livesIn: this.auth.localStorageArray[this.currentUser].livesIn,
      from: this.auth.localStorageArray[this.currentUser].from,
      messages: userMessage,
      posts: this.auth.localStorageArray[this.currentUser].posts,
    };

    this.auth.localStorageArray[id] = this.messageTo;
    this.auth.localStorageArray[this.currentUser] = this.sentMessage;
    localStorage.setItem('user', JSON.stringify(this.auth.localStorageArray));
    this.inputData = null;
  }

  ngOnInit() {
    this.posts = this.postService.posts;
  }
}
