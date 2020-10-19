import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Subscriber } from 'rxjs';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';

import * as SockJS from 'sockjs-client';
import * as Socket from 'socket.io-client';
import { Stomp } from '@stomp/stompjs/esm5/compatibility/stomp';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private auth: AuthService,
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/socket';

    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe('/message', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/send/message', {}, message);
  }

  public stompClient;
  public msg = [];

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
      { message: text }
    );
  }
}
