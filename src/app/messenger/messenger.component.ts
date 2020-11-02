import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ChatMessageDto } from '../models/chatMessageDto';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private aroute: ActivatedRoute,
    private route: Router,
    private accountService: AccountService,
    private chatService: ChatService,
    public webSocketService: WebSocketService
  ) {}

  ngOnDestroy() {
    this.webSocketService.closeWebSocket();
  }

  id: number;
  myConvWith;
  userData;
  requestedUser;
  message: string;
  greetings: string[] = [];
  ws: any;
  disabled: boolean;
  showConversation: boolean = false;
  name: string;
  now = new Date().getDay();

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

  sendMessage(message) {
    const chatMessageDto = {
      message: message,
      idReceiver: this.id,
      seen: false,
      date: new Date(),
      // token: localStorage.getItem('token'),
    };
    this.webSocketService.sendMessage(chatMessageDto);

    this.message = null;
  }

  async getUserData() {
    this.userData =
      this.accountService.userData || (await this.accountService.getUserData());
  }
  ngOnInit() {
    this.getUserData();
    this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
    this.webSocketService.openWebSocket();
    this.getUserById();
    this.getMyConvWithId(this.id);
    console.log(this.webSocketService.chatMessages);
  }
}
