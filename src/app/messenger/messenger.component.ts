import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
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
    private chatService: ChatService
  ) {}

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

  sendMessage(text) {
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
