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
    return this.http.get(
      this.rootUrl + 'messages/receivedFrom/accountId/' + senderId
    );
  }

  sendAMessage(message: ChatMessageDto) {
    return this.http.post(this.rootUrl + 'messages/sendMessage', message);
  }

  messageHasBeenSeen(userId: number) {
    return this.http.put(this.rootUrl + 'messages/seen', userId);
  }
}
