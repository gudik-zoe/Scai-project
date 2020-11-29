import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { notEqual } from 'assert';
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
  notifications: Notification[];
  unseenNots: Notification[] = [];
  userData: AccountBasicData;
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
    this.notifications = await this.notificationService.getNotification();
    if (this.notifications.length == 0) {
      this.haveNotification = false;
    } else {
      this.haveNotification = true;
    }
    for (let not of this.notifications) {
      if (!not.seen) {
        this.unseenNots.push(not);
      }
      not.timeUnit = await this.notificationService.timeCalculation(not);
    }
  }

  notificationSeen(notificationId: number) {
    this.notificationService
      .notHasBeenSeen(notificationId)
      .subscribe((data) => {
        this.unseenNots.pop();
        for (let not of this.notifications) {
          if (not.idNotification == notificationId) {
            not.seen = true;
          }
        }
      });
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  goToDescription(not: Notification) {
    this.route.navigate(['/description', not.relatedPostId]);
    if (!not.seen) {
      this.notificationSeen(not.idNotification);
    }
  }

  ngOnInit(): void {
    this.getUserData();
    this.getNotifications();
  }
}
