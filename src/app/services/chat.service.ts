import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private auth: AuthService,
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  users = JSON.parse(localStorage.getItem('user'));
  currentUser;
  messageTo;
  sentMessage;

  getMyConvWithId(senderId) {
    return this.http.get(
      'http://localhost:8080/messages/receivedFrom/' +
        this.accountService.getId() +
        '/' +
        senderId
    );
  }

  sendAMessage(to, text) {
    return this.http.post(
      'http://localhost:8080/messages/' +
        this.accountService.getId() +
        '/' +
        to,
      { theMessage: text }
    );
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('key'));
  }
  send(id, data, foto, audio) {
    this.currentUser = this.getCurrentUser();
    console.log(this.currentUser, id);
    let newMessage = this.auth.localStorageArray[id].messages;

    newMessage.push({
      message: data,
      sender: this.currentUser,
      foto,
      audio,
    });

    let userMessage = this.auth.localStorageArray[this.currentUser].messages;

    userMessage.push({
      message: data,
      to: id,
      foto,
      audio,
    });

    this.messageTo = {
      ...this.auth.localStorageArray[id],
      messages: newMessage,
    };

    this.sentMessage = {
      ...this.auth.localStorageArray[this.currentUser],
      messages: userMessage,
    };

    this.auth.localStorageArray[id] = this.messageTo;
    this.auth.localStorageArray[this.currentUser] = this.sentMessage;
    localStorage.setItem('user', JSON.stringify(this.auth.localStorageArray));
  }
  sendTo(id, data) {
    this.currentUser = this.getCurrentUser();
    let newMessage = this.auth.localStorageArray[id].messages;

    newMessage.push({
      message: data,
      sender: this.currentUser,
    });

    let userMessage = this.auth.localStorageArray[this.currentUser].messages;
    userMessage.push({
      message: data,
      to: id,
    });

    this.messageTo = {
      ...this.auth.localStorageArray[id],
      messages: newMessage,
    };

    this.sentMessage = {
      ...this.auth.localStorageArray[this.currentUser],
      messages: userMessage,
    };

    this.auth.localStorageArray[id] = this.messageTo;
    this.auth.localStorageArray[this.currentUser] = this.sentMessage;
    localStorage.setItem('user', JSON.stringify(this.auth.localStorageArray));
  }
}
