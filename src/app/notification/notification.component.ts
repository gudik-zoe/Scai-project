import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { Notification } from '../models/notification';
import { AccountService } from '../services/account.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notificationObject: Notification[];
  unseenNots = [];
  userData: Account;
  haveNotification: boolean;
  basicData: AccountBasicData[] = [];
  imgUrl: string = environment.rootUrl + 'files/';
  now: number = new Date().getTime();

  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService,
    private route: Router
  ) {}

  async getNotifications() {
    this.notificationObject = await this.notificationService.getNotification();
    if (this.notificationObject.length == 0) {
      this.haveNotification = false;
    } else {
      this.haveNotification = true;
    }
    for (let not of this.notificationObject) {
      if (!not.seen) {
        this.unseenNots.push(not);
      }
      not.date = Math.floor((this.now - not.date) / (1000 * 60));
      if (not.date * 60 < 1) {
        not.time = null;
        not.timeUnit = 'just now';
      } else if (not.date < 60) {
        not.time = not.date;
        not.time > 1 ? (not.timeUnit = 'minutes') : (not.timeUnit = 'minute');
      } else if (not.date > 60 && not.date / 60 < 24) {
        not.time = Math.floor(not.date / 60);
        not.time > 1 ? (not.timeUnit = 'hours') : (not.timeUnit = 'hour');
      } else if (not.date / 60 > 24) {
        not.time = Math.floor(not.date / 60 / 24);
        not.time > 1 ? (not.timeUnit = 'days') : (not.timeUnit = 'day');
      }
    }
  }

  notificationSeen() {
    this.notificationService.notHasBeenSeen();
    this.unseenNots = [];
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  goToDescription(postId) {
    this.route.navigate(['/description', postId]);
  }

  ngOnInit(): void {
    this.getUserData();
    this.getNotifications();
  }
}
