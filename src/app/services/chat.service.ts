import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatMessageDto } from '../models/chatMessageDto';
import { ImgUrl } from '../models/imgUrl';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl;
  chatIsActive: boolean = false;
  interval;
  clearUnseenMessages = new Subject<boolean>();
  haveNewMessages = new Subject<boolean>();
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
  myUnseenMessages: number;
  getMyUnseenMessages() {
    return new Promise<number>((resolve, reject) => {
      return this.http
        .get(this.rootUrl + 'messages/myMessages')
        .subscribe((data: number) => {
          this.myUnseenMessages = data;
          resolve(this.myUnseenMessages);
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

  // uploadImage(image: FormData) {
  //   return new Promise<string>((resolve, reject) => {
  //     this.http
  //       .post(this.rootUrl + 'messages/uploadImage', image)
  //       .subscribe((data: ImgUrl) => {
  //         resolve(data.imageUrl);
  //         reject('unknown error occured');
  //       });
  //   });
  // }

  // startInterval() {
  //   this.interval = setInterval(() => {
  //     console.log('hey');
  //     this.getMyMessages();
  //   }, 10000);
  // }

  // clearInterval() {
  //   clearInterval(this.interval);
  // }
}
