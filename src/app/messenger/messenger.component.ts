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

  ngOnInit() {
    this.webSocketService.openWebSocket();
    this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
    this.getUserById();
    this.getMyConvWithId(this.id);
    this.getUserData();
  }

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

  sendMessage(user, message) {
    const chatMessageDto = new ChatMessageDto(user, message);
    this.webSocketService.sendMessage(chatMessageDto);
    this.message = null;

    // this.chatService.sendAMessage(this.id, text).subscribe((data) => {
    //   this.getMyConvWithId(this.id);
    //   this.message = null;
    // });
  }

  getUserData() {
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
    });
  }
}
