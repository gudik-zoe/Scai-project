import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(
    private auth: AuthService,
    private accountService: AccountService,
    private http: HttpClient
  ) {}
  rootUrl: string = environment.rootUrl;

  getMyConvWithId(senderId: number) {
    return this.http.get(
      this.rootUrl +
        'messages/receivedFrom/' +
        this.accountService.getId() +
        '/' +
        senderId
    );
  }

  sendAMessage(to: number, text: string) {
    return this.http.post(
      this.rootUrl + 'messages/' + this.accountService.getId() + '/' + to,
      { message: text }
    );
  }
}
