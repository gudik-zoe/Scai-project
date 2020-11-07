import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { Account } from './models/account';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private AccountService: AccountService) {}
  open: boolean;

  ngOnInit() {
    this.AccountService.loggedIn.subscribe((data) => {
      this.open = data;
    });
    this.open = localStorage.getItem('token') ? true : false;
  }
}
