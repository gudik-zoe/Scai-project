import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from '../services/friends.service';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private friendService: FriendsService,
    private accountService: AccountService
  ) {}

  @Input() user: AccountBasicData;
  @Input() friends: AccountBasicData[];
  @Input() userData: AccountBasicData;
  @Input() areFriends: boolean;
  @Input() i: number;

  @Output() unFriendEvent = new EventEmitter<any>();
  status: string;
  subscription: Subscription;
  userFriends: AccountBasicData[];
  mutualFriends: AccountBasicData[] = [];
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

  unFriend(user: AccountBasicData) {
    this.unFriendEvent.emit(user);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getUserFriend() {
    if (this.areFriends) {
      this.userFriends = await this.accountService.getAnAccountFriend(
        this.user.idAccount
      );
      for (let friend of this.userFriends) {
        for (let friend2 of this.accountService.myFriends) {
          if (friend.idAccount == friend2.idAccount) {
            this.mutualFriends.push(friend);
          }
        }
      }
    }
  }

  ngOnInit() {
    this.getStatusWith();
    this.getRespondToRequestSubject();
    this.getUserFriend();
  }
}
