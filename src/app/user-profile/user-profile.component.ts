import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { FriendsService } from '../services/friends.service';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';

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
  requestedAccountPosts: Post[];
  btnDisable: boolean;

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

  async getPostsByAccountId(id: number) {
    this.requestedAccountPosts = await this.postService.getPostsByAccountId(id);
  }

  async getUserData() {
    this.loggedInUserData = await this.accountService.getUserData();
  }

  goToMessengerOrAddFriend(id: number) {
    if (this.status == 'add friend') {
      this.friendService.sendFriendRequest(id).subscribe((data) => {
        this.status = 'pending..cancel friend request';
      });
    } else if (this.status == 'chat') {
      this.route.navigate(['/messenger', id]);
    } else if (this.status == 'sent you a friend request') {
      return null;
    } else {
      this.friendService
        .deleteOrCancelFriendRequest(this.loggedInUserData.idAccount, this.id)
        .subscribe((data) => {
          this.status = 'add friend';
        });
    }
  }

  getIdFromUrl() {
    return new Promise<number>((resolve) => {
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
    this.status = await this.friendService.getRelationStatusBetweenMeAnd(
      this.id
    );
  }

  async userProfileSetFunctions() {
    await this.getIdFromUrl();
    await this.getUserById();
    await this.getPostsByAccountId(this.id);
    await this.getUserData();
    await this.getStatusWith();
  }

  ngOnInit() {
    this.userProfileSetFunctions();
  }
}
