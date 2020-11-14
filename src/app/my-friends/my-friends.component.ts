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
import { environment } from 'src/environments/environment';
import { Relationship } from '../models/relationship';

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
  @Input() user;
  @Input() userData: Account;
  imgUrl: string = environment.rootUrl + 'files/';

  goToFriendsCharRoom(id: number): void {
    this.route.navigate(['/messenger', id]);
  }

  goToProfile(id: number) {
    this.route.navigate(['/user-profile', id]);
  }

  ngOnInit() {}
}
