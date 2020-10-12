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
  haveNotification: boolean;
  basicData = [];
  prova = [{ idAccount: 4, hey: 'asd' }, { idAccount: 5 }];

  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService
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
    this.notificationService.getBasicData();
  }

  // async getBasicData() {
  //   for (let i of this.notificationObject) {
  //     const check = this.basicData.some(
  //       (item) => item.idAccount == i.notCreator
  //     );
  //     if (!check) {
  //       const data = await this.accountService.getBasicAccountDetails2(
  //         i.notCreator
  //       );
  //       this.basicData.push(data);
  //     }
  //   }
  //   console.log(this.basicData);
  // }

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
    const find = this.prova.find((item) => item.idAccount == 4);
    console.log(find);
  }
}
