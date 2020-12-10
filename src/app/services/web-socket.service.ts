import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatMessageDto } from '../models/chatMessageDto';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  webSocket: WebSocket;
  sendMessageSubject = new Subject<boolean>();
  chatMessages: ChatMessageDto[] = [];
  userIn: boolean = true;
  rootUrl: string = environment.rootUrl;

  constructor(private accountService: AccountService, private route: Router) {}

  public openWebSocket() {
    this.webSocket = new WebSocket(
      // 'wss://shielded-river-91999.herokuapp.com/chat'
      'ws://localhost:8080/chat'
    );
    this.webSocket.onopen = (event) => {
      this.webSocket.send(localStorage.getItem('token'));
      // console.log('open ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
      this.sendMessageSubject.next(true);
    };

    this.webSocket.onclose = (event) => {
      if (this.userIn) {
        this.openWebSocket();
      } else {
        // console.log('close ', event);
      }
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.userIn = false;
    this.webSocket.close();
  }
}
