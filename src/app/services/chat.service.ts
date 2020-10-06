import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscriber } from 'rxjs';
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
}