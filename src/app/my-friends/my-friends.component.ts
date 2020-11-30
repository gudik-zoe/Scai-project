import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { FriendsService } from '../services/friends.service';
import { PostsService } from '../services/posts.service';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment';
import { Relationship } from '../models/relationship';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private chatService: ChatService,
    private accountService: AccountService,
    private http: HttpClient,
    private friendService: FriendsService
  ) {}

  @Input() user: AccountBasicData;
  @Input() userData: AccountBasicData;
  @Input() areFriends: boolean;
  status: string;
  subscription: Subscription;
  goToFriendsCharRoom(id: number): void {
    this.route.navigate(['/messenger', id]);
  }

  goToProfile(id: number) {
    this.route.navigate(['/user-profile', id]);
  }
  addFriend(user: AccountBasicData) {
    if (this.status == 'add friend') {
      this.friendService.sendFriendRequest(user.idAccount).subscribe((data) => {
        this.status = 'pending cancel request';
      });
      // } else if (this.status == 'chat') {
      //   this.route.navigate(['/chat']);
      // }
    } else if (this.status == 'sent u a friend request') {
      return null;
    } else {
      this.friendService
        .deleteOrCancelFriendRequest(user.idAccount)
        .subscribe((data) => {
          this.status = 'add friend';
        });
    }
  }
  getRespondToRequestSubject() {
    this.subscription = this.friendService.respondToRequest.subscribe(
      (data) => {
        if (
          data.status == 2 &&
          data.userBasicData.idAccount == this.user.idAccount
        ) {
          this.status = 'add friend';
        }
      }
    );
  }

  async getStatusWith() {
    if (!this.areFriends) {
      this.status = await this.friendService.getRelationStatusBetweenMeAnd(
        this.user.idAccount
      );
    }
  }

  unfriend(user: AccountBasicData) {
    this.friendService
      .deleteOrCancelFriendRequest(user.idAccount)
      .subscribe((data) => {
        this.friendService.unfriendSubject.next(user);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getStatusWith();
    this.getRespondToRequestSubject();
  }
}
