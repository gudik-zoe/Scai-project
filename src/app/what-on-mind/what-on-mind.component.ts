import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { PostsService } from '../services/posts.service';
import { AccountBasicData } from '../models/accountBasicData';

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
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  openDiv() {
    this.createPost.emit(null);
    // this.postService.alertComponent.next({
    //   userData: this.userData,
    //   openComponent: true,
    // });
  }

  ngOnInit() {
    this.getUserData();
  }
}
