import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { PostsService } from '../services/posts.service';
import { AccountBasicData } from '../models/accountBasicData';
import { Post } from '../models/post';
import { Page } from '../models/page';
import { PageBasicData } from '../models/pageBasicData';

@Component({
  selector: 'app-what-on-mind',
  templateUrl: './what-on-mind.component.html',
  styleUrls: ['./what-on-mind.component.css'],
})
export class WhatOnMindComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private postService: PostsService
  ) {}
  userData: AccountBasicData;

  @Output() createPost = new EventEmitter<any>();

  @Input() requestedUser: Account;
  @Input() page: PageBasicData;
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  openDiv() {
    if (this.page) {
      this.createPost.emit(this.page);
    } else {
      this.createPost.emit({
        loggedInUserData: this.userData,
        requestedUserData: this.requestedUser,
      });
    }
  }

  ngOnInit() {
    this.getUserData();
  }
}
