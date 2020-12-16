import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Relationship } from '../models/relationship';
import { AccountService } from '../services/account.service';
import { FriendsService } from '../services/friends.service';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { ChatService } from '../services/chat.service';
import { WebSocketService } from '../services/web-socket.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { ChatMessageDto } from '../models/chatMessageDto';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  constructor(
    private friendsService: FriendsService,
    private accountService: AccountService,
    private chatService: ChatService,
    public webSocketService: WebSocketService,
    private notificationService: NotificationService
  ) {}
  myFriends: AccountBasicData[];
  imgUrl: string = environment.rootUrl + 'files/';
  userData: AccountBasicData;
  wantedUser: AccountBasicData;
  myConvWith: ChatMessageDto[];
  subscription: Subscription;
  message: string;
  messageIds: Array<number> = [];
  async getMyRelationships() {
    this.myFriends = await this.accountService.getAccountFriends();
    for (let friend of this.myFriends) {
      friend.unSeenMessages = await this.chatService.checkForUnseenMessagesForm(
        friend.idAccount
      );
    }
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  async getMyConvWithId(id: number) {
    this.myConvWith = await this.chatService.getMyConvWithId(id);
    this.webSocketService.chatMessages = [];
    for (let message of this.myConvWith) {
      message.date = this.notificationService.timeCalculation(message.date);
    }
    for (let friend of this.myFriends) {
      if (friend.idAccount == id) {
        friend.unSeenMessages = 0;
      }
    }
  }
  ngOnDestroy() {
    if (this.wantedUser) {
      this.webSocketService.closeWebSocket();
    }
    this.subscription.unsubscribe();
  }

  chatWith(user: AccountBasicData) {
    this.webSocketService.openWebSocket();
    if (this.wantedUser && this.wantedUser.idAccount == user.idAccount) {
      return null;
    } else {
      this.wantedUser = { ...user };
      this.getMyConvWithId(user.idAccount);
      this.chatService
        .messageHasBeenSeen(this.wantedUser.idAccount)
        .subscribe();
    }
  }

  scrollBottom() {
    document
      .getElementById('target')
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  sendMessage(message: string) {
    const textMessage = message.trim();
    if (!textMessage || textMessage == undefined) {
      return null;
    } else {
      const chatMessageDto = {
        message: message,
        idReceiver: this.wantedUser.idAccount,
        seen: false,
        date: this.notificationService.timeCalculation(new Date().toString()),
      };
      this.webSocketService.sendMessage(chatMessageDto);
      this.scroll();
      this.message = null;
    }
  }

  scroll() {
    document
      .getElementById('target')
      .scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  ngOnInit() {
    this.getMyRelationships();
    this.getUserData();

    this.subscription = this.webSocketService.sendMessageSubject.subscribe(
      (data) => {
        if (data && this.wantedUser) {
          document
            .getElementById('target')
            .scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    );
  }
}
