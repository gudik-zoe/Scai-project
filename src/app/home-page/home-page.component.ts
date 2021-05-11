import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FriendsService } from '../services/friends.service';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';
import { Post } from '../models/post';
import { SlicePipe } from '@angular/common';
import { Base64 } from '../models/base64';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostsService,
    private accountService: AccountService,
    private friendService: FriendsService
  ) {}
  userData: AccountBasicData;
  dbPosts: Post[];
  friends: AccountBasicData[] = [];
  peopleYouMayKnow: AccountBasicData[] = [];
  RespondToRequestSubject: Subscription;
  UnfriendSubject: Subscription;
  openFriends = false;
  openFriendsubscription: Subscription;
  status: string = 'friends';
  post: Post;
  base64: Base64;

  image() {
    return this.userData?.profilePhoto;
  }

  downloadPdf() {
    const linkSource =
      'data:' + this.base64.fileType + ';base64,' + this.base64.fileInBase64;
    const downloadLink = document.createElement('a');
    const fileName = this.base64.fileName + this.base64.fileType;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  async getFriends() {
    this.friends = await this.accountService.getAccountFriends();
  }
  async getPeopleyouMayKnow() {
    this.peopleYouMayKnow = await this.accountService.getPeopleYouMayKnow();
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  openDiv(event: any) {
    this.postService.alertComponent.next({
      userData: this.userData,
      openComponent: true,
    });
  }

  async getPosts() {
    this.dbPosts = await this.postService.getHomePagePosts();
  }

  getRespondToRequestSubject() {
    this.RespondToRequestSubject = this.friendService.respondToRequest.subscribe(
      (data) => {
        if (data.status == 1) {
          this.peopleYouMayKnow = this.peopleYouMayKnow.filter(
            (item: AccountBasicData) =>
              item.idAccount != data.userBasicData.idAccount
          );
          this.friends.push(data.userBasicData);
        }
      }
    );
  }

  unFriend(data: AccountBasicData) {
    this.friendService
      .deleteOrCancelFriendRequest(data.idAccount)
      .subscribe((u) => {
        this.peopleYouMayKnow.push(data);
        this.friends.forEach((element, index) => {
          if (element.idAccount == data.idAccount) {
            this.friends.splice(index, 1);
          }
        });
      });
  }

  ngOnDestroy() {
    this.RespondToRequestSubject.unsubscribe();
    // this.openFriendsubscription.unsubscribe();
  }

  getUsers() {
    this.accountService.getAllUsers();
  }

  getMyPostsInExcel() {
    this.accountService.getExcelFile().subscribe(
      (data: Base64) => {
        this.base64 = { ...data };
        console.log(this.base64);
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.getUserData();
    this.getPosts();
    this.getFriends();
    this.getPeopleyouMayKnow();
    this.getRespondToRequestSubject();
  }
}
