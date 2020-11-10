import { Component, OnInit } from '@angular/core';
import { Relationship } from '../models/relationship';
import { AccountService } from '../services/account.service';
import { FriendsService } from '../services/friends.service';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { ChatService } from '../services/chat.service';
import { WebSocketService } from '../services/web-socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  constructor(
    private friendsService: FriendsService,
    private accountService: AccountService,
    private chatService: ChatService,
    public webSocketService: WebSocketService
  ) {}
  myRelationships: Relationship[];
  imgUrl: string = environment.rootUrl + 'files/';
  userData: Account;
  wantedUser: AccountBasicData;
  myConvWith;
  message: string;
  async getMyRelationships() {
    this.myRelationships = await this.friendsService.getMyFriends();
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  getMyConvWithId(id: number) {
    this.chatService.getMyConvWithId(id).subscribe((data) => {
      this.myConvWith = data;
    });
  }
  ngOnDestroy() {
    this.webSocketService.closeWebSocket();
  }

  chatWith(doneBy: AccountBasicData) {
    this.wantedUser = { ...doneBy };
    this.getMyConvWithId(doneBy.idAccount);
  }
  sendMessage(message) {
    const chatMessageDto = {
      message: message,
      idReceiver: this.wantedUser.idAccount,
      seen: false,
      date: new Date(),
    };
    this.webSocketService.sendMessage(chatMessageDto);
    this.message = null;
  }
  ngOnInit() {
    this.getMyRelationships();
    this.getUserData();
    this.webSocketService.openWebSocket();
  }
}
