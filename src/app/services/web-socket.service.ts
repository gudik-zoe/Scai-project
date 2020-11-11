import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ChatMessageDto } from '../models/chatMessageDto';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  webSocket: WebSocket;
  chatMessages: ChatMessageDto[] = [];
  userIn: boolean = true;

  constructor(private accountService: AccountService, private route: Router) {}

  public openWebSocket() {
    this.webSocket = new WebSocket(
      'wss://shielded-river-91999.herokuapp.com/chat'
    );
    this.webSocket.onopen = (event) => {
      this.webSocket.send(localStorage.getItem('token'));
      console.log('open ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      if (this.userIn) {
        this.openWebSocket();
      } else {
        this.route.navigate(['/home-page']);
        console.log('close ', event);
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
