import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Notification } from '../models/notification';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  notificationObject: Notification[];

  basicData = [];
  rootUrl: string = environment.rootUrl;
  addNotification(notification: Notification) {
    return this.http.post(
      this.rootUrl + 'notification/addNotification',
      notification
    );
  }

  getNotification() {
    return new Promise<Notification[]>((resolve) => {
      this.http
        .get(this.rootUrl + 'notification/getNotification/accountId')
        .subscribe((data: Notification[]) => {
          this.notificationObject = data;
          this.getBasicData(this.notificationObject);
          resolve(this.notificationObject);
        });
    });
  }

  async getBasicData(notifications: Notification[]) {
    for (let not of notifications) {
      not.doneBy = await this.accountService.getBasicAccountDetails(
        not.notCreator
      );
    }
  }

  notHasBeenSeen() {
    this.http
      .put(this.rootUrl + 'notification/notificationSeen/accountId', {})
      .subscribe();
  }
}
