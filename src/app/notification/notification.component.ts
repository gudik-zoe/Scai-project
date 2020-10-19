import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
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
  basicData = [];
  imgUrl: string = environment.rootUrl + 'files/';
  now = new Date().getTime();
  date = new Date('10/11/2020').getTime();

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
      not.dateInMinutes = Math.floor((this.now - not.date) / (1000 * 60));
    }
  }

  notificationSeen() {
    this.notificationService.notHasBeenSeen(this.userData.idAccount);
    this.unseenNots = [];
  }

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  goToDescription(postId) {
    this.route.navigate(['/description', postId]);
  }

  ngOnInit(): void {
    this.getUserData();
    this.getNotifications();
  }
}
