import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FriendsService } from '../services/friends.service';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-friends-container',
  templateUrl: './friends-container.component.html',
  styleUrls: ['./friends-container.component.css'],
})
export class FriendsContainerComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private postsService: PostsService
  ) {}

  @Input() users: AccountBasicData[];
  @Input() areFriends: boolean;

  @Output() unFriendInHomePage = new EventEmitter<any>();
  userData: AccountBasicData;

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  goToFriendsCharRoom(id: number): void {
    this.route.navigate(['/messenger', id]);
  }

  unFriendInParent(data: AccountBasicData) {
    this.unFriendInHomePage.emit(data);
  }

  ngOnInit() {
    this.getUserData();
  }
}
