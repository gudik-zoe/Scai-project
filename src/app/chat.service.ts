import { Injectable } from '@angular/core';
import { AuthService } from './log-in/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private auth: AuthService) {}

  users = JSON.parse(localStorage.getItem('user'));
  currentUser;
  messageTo;
  sentMessage;
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('key'));
  }
  send(id, data, foto) {
    console.log(foto);
    this.currentUser = this.getCurrentUser();
    let newMessage = this.auth.localStorageArray[id].messages;

    newMessage.push({
      message: data,
      sender: this.currentUser,
      foto,
    });

    let userMessage = this.auth.localStorageArray[this.currentUser].messages;
    userMessage.push({
      message: data,
      to: id,
      foto,
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
