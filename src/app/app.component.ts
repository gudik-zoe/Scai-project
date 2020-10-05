import { Component, OnInit, OnDestroy } from '@angular/core';

import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { StorageService } from './services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountModel } from './models/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private postService: PostsService,
    private _sanitizer: DomSanitizer,
    private route: Router,
    private auth: AuthService,
    private storageService: StorageService
  ) {}
  title = 'scai-project';
  loggedInSubscription: Subscription;
  show = true;
  message = false;
  loggedIn;
  userData;
  userImage;
  userIn() {
    if (localStorage.getItem('token') !== null) {
      return true;
    } else {
      return false;
    }
  }
  navigate() {
    this.show = false;
  }

  deactivate() {
    this.accountService.deleteAccount().subscribe(
      (data) => {
        localStorage.removeItem('token');
        this.route.navigate(['/auth']);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logOut() {
    this.route.navigate(['/auth']);
    localStorage.removeItem('token');
    this.show = true;
  }

  getUserData() {
    return new Promise((resolve) => {
      this.accountService.getData().subscribe((data) => {
        this.userData = data;
        resolve(this.userData);
      });
    });
  }

  async myFunction() {
    await this.getUserData();
  }

  ngOnInit() {
    this.myFunction();
    this.accountService.imageSubject.subscribe((data) => {
      if (data) {
        this.getUserData();
      }
    });
  }
}
