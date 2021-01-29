import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Notification } from '../models/notification';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private datePipe: DatePipe
  ) {}
  notificationObject: Notification[];
  restOfTheNotifications = [];

  rootUrl: string = environment.rootUrl;

  getNotification() {
    return new Promise<Notification[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'notification/getNotification/accountId')
        .subscribe((data: Notification[]) => {
          this.notificationObject = data;
          this.getBasicData(this.notificationObject);
          for (let not of this.notificationObject) {
            not.date = this.timeCalculation(not.date);
          }
          resolve(this.notificationObject);
          reject('uknown error occured');
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

  notHasBeenSeen(notificationId: number) {
    return this.http.put(
      this.rootUrl + 'notification/notificationSeen/' + notificationId,
      {}
    );
  }

  allNotificationsSeen() {
    return this.http.put(
      this.rootUrl + 'notification/allNotification/seen',
      {}
    );
  }

  loadMore(idNotification: number) {
    return new Promise<Notification[]>((resolve, reject) => {
      this.http
        .post(this.rootUrl + 'loadMore', idNotification)
        .subscribe((data: Notification[]) => {
          if (data) {
            this.restOfTheNotifications = data;
            this.getBasicData(this.restOfTheNotifications);
            for (let not of this.restOfTheNotifications) {
              not.date = this.timeCalculation(not.date);
            }
            resolve(this.restOfTheNotifications);
          }
        });
    });
  }

  getNotificationDetails() {
    return this.http.get(this.rootUrl + 'notification/notificationDetails');
  }

  timeCalculation(date: string) {
    const now = new Date().getTime();
    let timeToCalculate = now - new Date(date).getTime();
    let dateInSeconds = Math.floor(timeToCalculate / 1000);
    let dateInMinutes = Math.floor(dateInSeconds / 60);
    let dateInHours = Math.floor(dateInMinutes / 60);
    let dateInDays = Math.floor(dateInHours / 24);
    if (dateInMinutes < 1) {
      return 'just now';
    } else if (dateInMinutes >= 1 && dateInMinutes < 59) {
      return dateInMinutes.toString() + ' mins ago';
    } else if (dateInMinutes > 59 && dateInHours < 24) {
      return dateInHours.toString() + ' hr ago';
    } else if (dateInHours > 24 && dateInDays < 2) {
      return dateInDays.toString() + ' days ago';
    } else {
      return this.datePipe.transform(date, 'short');
    }
  }
}
