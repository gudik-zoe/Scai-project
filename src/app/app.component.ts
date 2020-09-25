import { Component, OnInit, OnDestroy } from '@angular/core';

import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';
import { AuthService } from './services/auth.service';
import { PostsService } from './services/posts.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
    private postService: PostsService,
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
  getUserName() {
    return this.userData.firstName;
  }
  getMessengerLength() {
    return this.storageService.getMessages();
  }
  image() {
    return this.accountService.userData?.profilePhoto;
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

  ngOnInit() {
    // this.backEnd.getData().subscribe((data) => {
    //   this.userData = data;
    // });
    this.storageService.message.subscribe((data) => {
      this.message = data;
    });
  }
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
}
