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
  message: string;
  loggedIn: boolean = localStorage.getItem('token') ? true : false;
  userData: AccountModel;
  errorPhrase: string = 'JWT expired';

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

  async getData() {
    this.userData = await this.accountService.getUserData();
  }

  getUserData() {
    this.accountService.refresh.subscribe((data: boolean) => {
      if (data) {
        this.getData();
      }
    });
  }

  // getUserData() {
  //   return new Promise((resolve, reject) => {
  //     this.accountService.getData().subscribe(
  //       (data: AccountModel) => {
  //         this.userData = data;
  //         resolve(this.userData);
  //       },
  //       (error) => {
  //         const error2 = error.error.message.startsWith(this.errorPhrase);
  //         if (error2) {
  //           localStorage.removeItem('token');
  //           this.route.navigate(['/auth']);
  //           this.message = 'token is expired log in again to continue';
  //           reject(this.message);
  //         }
  //       }
  //     );
  //   });
  // }

  updateImage() {
    this.accountService.imageSubject.subscribe((data) => {
      if (data) {
        this.getUserData();
      }
    });
  }
  navBarController() {
    this.accountService.loggedIn.subscribe((data: boolean) => {
      this.loggedIn = data;
    });
  }

  ngOnInit() {
    this.getData();
    this.getUserData();
    this.updateImage();
    this.navBarController();
  }
}
