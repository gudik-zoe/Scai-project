import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ChatMessageDto } from '../models/chatMessageDto';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl;

  getMyConvWithId(senderId: number) {
    return new Promise<ChatMessageDto[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'messages/receivedFrom/accountId/' + senderId)
        .subscribe((data: ChatMessageDto[]) => {
          resolve(data);
        });
    });
  }

  sendAMessage(message: ChatMessageDto) {
    return this.http.post(this.rootUrl + 'messages/sendMessage', message);
  }

  messageHasBeenSeen(userId: number) {
    return this.http.put(this.rootUrl + 'messages/seen', userId);
  }

  getMyMessages() {
    return new Promise<number>((resolve, reject) => {
      return this.http
        .get(this.rootUrl + 'messages/myMessages')
        .subscribe((data: number) => {
          resolve(data);
          reject('unknown error occured');
        });
    });
  }

  checkForUnseenMessagesForm(userId: number) {
    return new Promise<number>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'messages/unseenMessages/' + userId)
        .subscribe((data: number) => {
          resolve(data);
        });
    });
  }
}
