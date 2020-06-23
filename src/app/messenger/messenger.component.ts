import { Component, OnInit } from '@angular/core';
import { AuthService } from '../log-in/auth.service';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private storageService: StorageService,
    private aroute: ActivatedRoute,
    private route: Router
  ) {}
  users = this.auth.localStorageArray;
  currentUser = JSON.parse(localStorage.getItem('key'));
  id = null;
  inputData;
  messageTo;
  sentMessage;
  messages = this.auth.localStorageArray[this.currentUser].messages;
  navigate(id) {
    this.id = id;
  }
  open(id) {
    this.id = id;
  }
  send(id, data) {
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
    this.id = null;
  }

  ngOnInit() {}
}
