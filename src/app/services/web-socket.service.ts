import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ChatMessageDto } from '../models/chatMessageDto';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  webSocket: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor(private accountService: AccountService) {}

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket.onopen = (event) => {
      this.webSocket.send(localStorage.getItem('token'));
      console.log('open ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log(event);
      const chatMessageDto = JSON.parse(event.data);
      //  chatMessageDto.idSender = this.accountService.getId();
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('close ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
