import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { FriendsService } from '../services/friends.service';
import { PostsService } from '../services/posts.service';
import { Account } from '../models/account';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit {
  constructor(
    private route: Router,
    private chatService: ChatService,
    private accountService: AccountService,
    private http: HttpClient,
    private friendService: FriendsService
  ) {}
  @Input() user: Account;
  @Input() userData: Account;

  goToFriendsCharRoom(id: number): void {
    this.route.navigate(['/messenger', id]);
  }

  goToProfile(id) {
    this.route.navigate(['/user-profile', id]);
  }

  ngOnInit() {}
}
