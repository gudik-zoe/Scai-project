import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../models/account';
import { AccountService } from '../services/account.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notificationObject;
  unseenNots = [];
  userData: AccountModel;

  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService
  ) {}

  async getNotifications() {
    this.notificationObject = await this.notificationService.getNotification();
    for (let i of this.notificationObject) {
      if (!i.seen) {
        this.unseenNots.push(i);
      }
    }
  }

  notificationSeen() {
    this.notificationService.notHasBeenSeen(this.userData.idAccount);
    this.unseenNots = [];
  }

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  ngOnInit(): void {
    this.getUserData();
    this.getNotifications();
  }
}
