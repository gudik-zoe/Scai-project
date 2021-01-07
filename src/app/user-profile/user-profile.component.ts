import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { Page } from '../models/page';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { FriendsService } from '../services/friends.service';
import { PagesService } from '../services/pages.service';
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
    private postService: PostsService,
    private aroute: ActivatedRoute,
    private friendService: FriendsService,
    private pageService: PagesService
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
  myPages: Page[];

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
  getUserFromUrl() {
    return new Promise<Account>(async (resolve, reject) => {
      this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
      this.requestedUserData = await this.accountService.getAccountById(
        this.id
      );
      resolve(this.requestedUserData);
      reject('uknown error occured');
    });
  }

  respondFriendRequest(id: number, status: number) {
    this.friendService.acceptFriendRequest(id, status).subscribe((data) => {});
  }

  async getStatusWith(id: number) {
    if (id == this.loggedInUserData.idAccount) {
      this.status = 'friends';
    } else {
      this.status = await this.friendService.getRelationStatusBetweenMeAnd(id);
    }
  }
  mutualFriends: AccountBasicData[] = [];
  userFriends: AccountBasicData[];
  async getMutualFriends() {
    if (!this.accountService.myFriends) {
      this.accountService.getAccountFriends();
    }
    if (this.id != this.loggedInUserData.idAccount) {
      this.userFriends = await this.accountService.getAnAccountFriend(this.id);
      for (let friend of this.accountService.myFriends) {
        for (let friend2 of this.userFriends) {
          if (friend.idAccount == friend2.idAccount) {
            this.mutualFriends.push(friend);
          }
        }
      }
    }
  }
  async getMyPages() {
    this.myPages = await this.pageService.getMyPages();
  }

  async userProfileSetFunctions() {
    await this.getUserFromUrl();
    await this.getPostsByAccountId(this.requestedUserData.idAccount);
    await this.getUserData();
    await this.getStatusWith(this.requestedUserData.idAccount);
    await this.getMutualFriends();
    this.getMyPages();
  }

  goToPage(page: Page) {
    this.route.navigate(['user-pages', page.idPage]);
  }
  ngOnInit() {
    this.aroute.params.subscribe((params) => {
      const id = params['id'];
      if (id != this.id) {
        this.userProfileSetFunctions();
      }
    });
  }
}
