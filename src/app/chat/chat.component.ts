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
  myRelationships: Relationship[];
  imgUrl: string = environment.rootUrl + 'files/';
  userData: AccountBasicData;
  wantedUser: AccountBasicData;
  myConvWith: ChatMessageDto[];
  subscription: Subscription;
  message: string;
  messageIds: Array<number> = [];
  async getMyRelationships() {
    this.myRelationships = await this.friendsService.getMyFriends();
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  getMyConvWithId(id: number) {
    this.chatService
      .getMyConvWithId(id)
      .subscribe(async (data: ChatMessageDto[]) => {
        this.myConvWith = data;
        for (let message of this.myConvWith) {
          message.date = this.notificationService.timeCalculation(message.date);
        }
      });
  }
  ngOnDestroy() {
    this.webSocketService.closeWebSocket();
    this.subscription.unsubscribe();
  }

  chatWith(doneBy: AccountBasicData) {
    if (this.wantedUser && this.wantedUser.idAccount == doneBy.idAccount) {
    } else {
      this.wantedUser = { ...doneBy };
      this.getMyConvWithId(doneBy.idAccount);
      this.chatService
        .messageHasBeenSeen(this.wantedUser.idAccount)
        .subscribe((data) => {
          for (let message of this.webSocketService.chatMessages) {
            if (
              message.idSender == this.wantedUser.idAccount &&
              message.idReceiver == this.userData.idAccount
            ) {
              message.seen = true;
            }
          }
        });
    }
  }
  sendMessage(message: string, el: HTMLElement) {
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
      this.scroll(el);
      this.message = null;
      // for (let message of this.webSocketService.chatMessages) {
      //   if (
      //     message.idSender == this.userData.idAccount &&
      //     message.idReceiver == this.wantedUser.idAccount
      //   ) {
      //     message.seen = true;
      //   }
      // }
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  ngOnInit() {
    this.getMyRelationships();
    this.getUserData();
    this.webSocketService.openWebSocket();
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
