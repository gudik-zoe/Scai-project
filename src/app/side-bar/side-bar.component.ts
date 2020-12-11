import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { ChatMessageDto } from '../models/chatMessageDto';
import { AccountService } from '../services/account.service';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private chatService: ChatService
  ) {}

  userData: AccountBasicData;
  imgUrl: string = environment.rootUrl + 'files/';
  myMessages: ChatMessageDto[] = [];
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  public subscribtion: Subscription;
  getTheUpdatedImage() {
    this.subscribtion = this.accountService.imageSubject.subscribe(
      (data: string) => {
        this.userData.profilePhoto = data;
      }
    );
  }

  goToChat() {
    this.route.navigate(['/chat']);
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }

  async getMyMessages() {
    this.myMessages = await this.chatService.getMyMessages();
  }
  ngOnInit() {
    this.getUserData();
    this.getTheUpdatedImage();
    this.getMyMessages();
  }
}
