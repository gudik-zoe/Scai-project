import { Component, OnInit, OnDestroy } from '@angular/core';

import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { StorageService } from './services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Account } from './models/account';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private auth: AuthService,
    private notificationService: NotificationService,
    private postService: PostsService
  ) {}
  title = 'scai-project';
  loggedInSubscription: Subscription;
  message: string;
  loggedIn: boolean = localStorage.getItem('token') ? true : false;
  userData: Account;
  errorPhrase: string = 'JWT expired';
  notificationObject;
  editPost: boolean = false;

  deactivate() {
    this.accountService.deleteAccount().subscribe(
      (data) => {
        localStorage.removeItem('token');
        this.route.navigate(['/auth']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.route.navigate(['/auth']);
    this.loggedIn = false;
  }

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  getTheUpdatedImage() {
    this.accountService.imageSubject.subscribe((data: boolean) => {
      if (data) {
        this.getUserData();
      }
    });
  }
  navBarController() {
    this.accountService.loggedIn.subscribe((data: boolean) => {
      this.loggedIn = data;
      this.getUserData();
    });
  }

  ngOnInit() {
    this.getUserData();
    this.getTheUpdatedImage();
    this.navBarController();
  }
}
