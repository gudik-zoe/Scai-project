import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { EventsService } from '../services/events.service';
import { FriendsService } from '../services/friends.service';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private service: PostsService,
    private postService: PostsService,
    private aroute: ActivatedRoute,
    private friendService: FriendsService,
    private notificationService: NotificationService
  ) {}
  imgUrl: string = environment.rootUrl + 'files/';
  requestedUserData: Account;
  id: number;
  loggedInUserData: Account;
  status: string;
  requestedAccountPosts: Post;
  notificationObject;
  user;
  dbPosts: Post;

  goToEditing() {
    this.route.navigate(['/account-settings']);
  }

  getUserById() {
    return new Promise<Account>((resolve) => {
      this.accountService.getAccountById(this.id).subscribe((data: Account) => {
        this.requestedUserData = data;
        resolve(this.requestedUserData);
      });
    });
  }

  async getPostsByAccountId(id) {
    this.requestedAccountPosts = await this.postService.getPostsByAccountId(id);
    console.log(this.requestedAccountPosts);
  }

  async getUserData() {
    this.loggedInUserData = await this.accountService.getUserData();
  }

  getFriendRequests() {
    return new Promise((resolve) => {
      this.friendService.getFriendRequests(this.id).subscribe((data) => {
        this.user = data;
        resolve(this.user);
      });
    });
  }

  goToMessengerOrAddFriend(id) {
    if (this.status == 'add friend') {
      this.friendService.sendFriendRequest(id).subscribe((data) => {
        this.status = 'pending - cancel request';
      });
    } else if (this.status == 'chat') {
      this.route.navigate(['/messenger', id]);
    } else {
      this.friendService
        .deleteOrCancelFriendRequest(this.loggedInUserData.idAccount, this.id)
        .subscribe((data) => {
          this.status = 'add friend';
        });
    }
  }

  getIdFromUrl() {
    return new Promise((resolve) => {
      this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
      resolve(this.id);
    });
  }

  respondFriendRequest(id: number, status: number) {
    this.friendService.acceptFriendRequest(id, status).subscribe((data) => {
      console.log(data);
    });
  }

  async getStatusWith() {
    await this.friendService.getRelationStatusBetweenMeAnd(this.id);
    this.status = this.friendService.status;
  }

  async userProfileSetFunctions() {
    await this.getIdFromUrl();
    await this.getUserById();
    await this.getPostsByAccountId(this.id);
    await this.getUserData();
    await this.getFriendRequests();
    await this.getStatusWith();
  }

  ngOnInit() {
    this.userProfileSetFunctions();
  }
}
