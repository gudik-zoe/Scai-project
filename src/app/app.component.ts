import { Component, OnInit } from '@angular/core';
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
  constructor(private accountService: AccountService, private route: Router) {}
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
    this.accountService.userData = null;
    localStorage.removeItem('token');
    this.route.navigate(['/auth']);
    this.loggedIn = false;
  }

  async getUserData() {
    this.userData =
      this.accountService.userData || (await this.accountService.getUserData());
  }

  getTheUpdatedImage() {
    this.accountService.imageSubject.subscribe(async (data: boolean) => {
      if (data) {
        this.userData = await this.accountService.getUserData();
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
