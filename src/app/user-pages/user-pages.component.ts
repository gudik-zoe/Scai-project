import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountBasicData } from '../models/accountBasicData';
import { Page } from '../models/page';
import { PageBasicData } from '../models/pageBasicData';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { NotificationService } from '../services/notification.service';
import { PagesService } from '../services/pages.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-user-pages',
  templateUrl: './user-pages.component.html',
  styleUrls: ['./user-pages.component.css'],
})
export class UserPagesComponent implements OnInit, OnDestroy {
  constructor(
    private aroute: ActivatedRoute,
    private pageService: PagesService,
    private postService: PostsService,
    private notificationService: NotificationService,
    private accountService: AccountService
  ) {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  id: number;
  page: Page;
  status: string = 'friends';
  subscription: Subscription;
  userData: AccountBasicData;
  isAdmin: boolean;
  editPage: boolean;

  async getPageInfo() {
    this.page = this.pageService.pages.find((item) => item.idPage == this.id);
    if (!this.page) {
      this.page = await this.pageService.getPageFullData(this.id);
    }
    for (let post of this.page.posts) {
      this.postService.getUserDetails(post);
    }
    this.page.pageCreatorId == this.userData.idAccount
      ? (this.isAdmin = true)
      : (this.isAdmin = false);
  }

  openDiv(event: any) {
    this.postService.alertComponent.next({
      page: this.page,
      openComponent: true,
    });
  }

  getNewPost() {
    this.subscription = this.pageService.addPost.subscribe((data: Post) => {
      if (data) {
        data.date = this.notificationService.timeCalculation(data.date);
        this.page.posts.unshift(data);
      }
    });
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  openEditPage() {
    this.editPage = true;
  }

  closeEditPage(data: boolean) {
    this.editPage = data;
  }

  receiveNewPage(data: Page) {
    this.page.profilePhoto = data.profilePhoto;
    this.page.coverPhoto = data.coverPhoto;
    this.page.name = data.name;
    this.page.description = data.description;
  }
  ngOnInit() {
    this.aroute.params.subscribe((params) => {
      this.id = params['id'];
      this.getUserData();
      this.getPageInfo();
    });
    this.getNewPost();
  }
}
