import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
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
  friends: AccountBasicData[];
  users: AccountBasicData[];

  goToEditing() {
    this.route.navigate(['/account-settings']);
  }

  async getPostsByAccountId(id: number) {
    this.requestedAccountPosts = await this.postService.getPostsByAccountId(id);
  }

  async getUserData() {
    this.loggedInUserData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserDataFullData());
  }

  openLeavePostComponent(data) {
    this.postService.leavePostComponent.next({
      leavePostComponent: true,
      userData: data.loggedInUserData,
      requestedUserData: data.requestedUserData,
    });
  }
  getIdFromUrl() {
    return new Promise<number>((resolve, reject) => {
      this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
      resolve(this.id);
      reject('uknown error occured');
    });
  }

  respondFriendRequest(id: number, status: number) {
    this.friendService.acceptFriendRequest(id, status).subscribe((data) => {});
  }

  async getStatusWith() {
    this.status = await this.friendService.getRelationStatusBetweenMeAnd(
      this.id
    );
    console.log(this.status);
  }

  async getFriends() {
    this.friends = await this.accountService.getAccountFriends();
  }

  async getUsers() {
    this.users = await this.accountService.getAllUsers();
  }

  async userProfileSetFunctions() {
    await this.getUsers();
    await this.getIdFromUrl();
    await this.getPostsByAccountId(this.id);
    await this.getUserData();
    await this.getStatusWith();
    await this.getFriends();
    // await this.getUserById();
  }

  ngOnInit() {
    this.userProfileSetFunctions();
  }
}
