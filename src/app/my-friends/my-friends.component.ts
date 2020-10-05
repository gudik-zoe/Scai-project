import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Router } from '@angular/router';

import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit {
  users;
  userData;

  constructor(
    private postService: PostsService,
    private route: Router,
    private auth: AuthService,
    private chatService: ChatService,
    private _sanitizer: DomSanitizer,
    private accountService: AccountService,
    private http: HttpClient
  ) { }
  usersImages = [];

  getUsers() {
    return new Promise((resolve) => {
      this.accountService.getUsers().subscribe((data) => {
        this.users = data;
        resolve(this.users);
      });
    });
  }
  getUserData() {
    return new Promise((resolve) => {
      this.accountService.getData().subscribe((data) => {
        this.userData = data;
        resolve(this.userData);
      });
    });
  }
  goToFriendsCharRoom(id: number): void {
    this.route.navigate(['/messenger', id]);
  }

  async functions() {
    await this.getUserData();
    await this.getUsers();

  }
  ngOnInit() {
    this.functions();
  }
}
