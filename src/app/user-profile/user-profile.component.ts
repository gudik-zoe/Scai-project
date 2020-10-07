import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountModel } from '../models/account';
import { PostsModel } from '../models/posts';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { EventsService } from '../services/events.service';
import { FriendsService } from '../services/friends.service';
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
    private friendService: FriendsService
  ) {}
  imgUrl: string = environment.rootUrl + 'files/';
  requestedUserData: AccountModel;
  id: number;
  loggedInUserData: AccountModel;
  status: string;
  requestedAccountPosts: PostsModel;

  goToEditing() {
    this.route.navigate(['/account-settings']);
  }

  getUserById() {
    return new Promise<AccountModel>((resolve) => {
      this.accountService
        .getAccountById(this.id)
        .subscribe((data: AccountModel) => {
          this.requestedUserData = data;
          resolve(this.requestedUserData);
        });
    });
  }

  async getPostsByAccountId(id) {
    this.requestedAccountPosts = await this.postService.getPostsByAccountId(id);
  }

  async getUserData() {
    this.loggedInUserData = await this.accountService.getUserData();
  }

  // getLoggedInUserData() {
  //   return new Promise((resolve) => {
  //     this.accountService.getData().subscribe((data) => {
  //       this.loggedInUserData = data;
  //       resolve(this.loggedInUserData);
  //     });
  //   });
  // }
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

  async function() {
    await this.getIdFromUrl();
    await this.getUserById();
    await this.getPostsByAccountId(this.id);
    await this.getUserData();
    await this.friendService.getRelationStatusBetweenMeAnd(this.id);
    this.status = this.friendService.status;
  }

  ngOnInit() {
    this.function();
  }
}
