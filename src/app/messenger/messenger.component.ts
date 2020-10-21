import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { Stomp } from '@stomp/stompjs/esm5/compatibility/stomp';
import * as SockJS from 'sockjs-client';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { StorageService } from '../services/storage.service';

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
    private route: Router,
    private accountService: AccountService,
    private chatService: ChatService,
    private http: HttpClient,
    private _sanitizer: DomSanitizer
  ) {}
  id: number;
  myConvWith;
  userData;
  requestedUser;
  message: string;
  private serverUrl = 'http://localhost:8080/greeting';
  private title = 'WebSockets chat';
  private stompClient;
  greetings: string[] = [];
  ws: any;
  disabled: boolean;
  showConversation: boolean = false;
  name: string;

  connect() {
    //connect to stomp where stomp endpoint is exposed
    let ws = new SockJS(this.serverUrl);
    let socket = new WebSocket('http://localhost:8080/greeting');
    this.ws = Stomp.over(socket);
    let that = this;
    this.ws.connect(
      {},
      function (frame) {
        that.ws.subscribe('/errors', function (message) {
          alert('Error ' + message.body);
        });
        that.ws.subscribe('/topic/reply', function (message) {
          console.log(message);
          that.showGreeting(message.body);
        });
        that.disabled = true;
      },
      function (error) {
        alert('STOMP error ' + error);
      }
    );
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log('Disconnected');
  }

  sendName() {
    let data = JSON.stringify({
      name: this.name,
    });
    this.ws.send('/app/message', {}, data);
  }

  showGreeting(message) {
    this.showConversation = true;
    this.greetings.push(message);
  }

  setConnected(connected) {
    this.disabled = connected;
    this.showConversation = connected;
    this.greetings = [];
  }

  getMyConvWithId(id) {
    this.chatService.getMyConvWithId(id).subscribe((data) => {
      this.myConvWith = data;
    });
  }

  getUserById() {
    this.accountService.getAccountById(this.id).subscribe((data) => {
      this.requestedUser = data;
    });
  }

  sendMessage(text) {
    this.sendName();
    this.chatService.sendAMessage(this.id, text).subscribe((data) => {
      this.getMyConvWithId(this.id);
      this.message = null;
    });
  }

  getUserData() {
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
    this.getUserById();
    this.getMyConvWithId(this.id);
    this.getUserData();
  }
}
