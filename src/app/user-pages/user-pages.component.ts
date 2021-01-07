import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  page: PageBasicData;
  pagePosts: Post[];
  status: string = 'friends';
  subscription: Subscription;
  async getPageInfo() {
    this.page = await this.pageService.getPageData(this.id);
    this.pagePosts = await this.postService.getPagePosts(this.id);
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
        this.pagePosts.unshift(data);
      }
    });
  }

  ngOnInit() {
    this.aroute.params.subscribe((params) => {
      this.id = params['id'];
      this.getPageInfo();
    });
    this.getNewPost();
  }
}
