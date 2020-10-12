import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
    for (let i of this.notificationObject) {
      if (!i.seen) {
        this.unseenNots.push(i);
      }
    }
    console.log(this.notificationObject);
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
