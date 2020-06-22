import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { StorageService } from '../storage.service';
import { AuthService } from '../log-in/auth.service';
import { MyFriendsComponent } from '../my-friends/my-friends.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css'],
})
export class AddFriendsComponent implements OnInit {
  constructor(
    private postService: PostsService,
    private storageService: StorageService,
    private auth: AuthService,
    private route: Router
  ) {}
  messageTo;
  sentMessage;
  users = JSON.parse(localStorage.getItem('user'));
  sender;
  currentUser = JSON.parse(localStorage.getItem('key'));

  sendTo(id, data) {
    let newMessage = this.auth.localStorageArray[id].messages;

    newMessage.push({
      image: this.auth.localStorageArray[this.currentUser].image,
      message: data.value,
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
      messages: newMessage,
      posts: this.auth.localStorageArray[this.currentUser].posts,
    };

    this.auth.localStorageArray[id] = this.messageTo;
    this.auth.localStorageArray[this.currentUser] = this.sentMessage;
    localStorage.setItem('user', JSON.stringify(this.auth.localStorageArray));
    data.value = null;
  }

  ngOnInit() {}
}
