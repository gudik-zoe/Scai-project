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

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit, OnDestroy {
  constructor(private route: Router, private friendService: FriendsService) {}

  @Input() user: AccountBasicData;
  @Input() userData: AccountBasicData;
  @Input() areFriends: boolean;
  @Input() i: number;

  @Output() unFriendEvent = new EventEmitter<any>();
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

  ngOnInit() {
    this.getStatusWith();
    this.getRespondToRequestSubject();
  }
}
