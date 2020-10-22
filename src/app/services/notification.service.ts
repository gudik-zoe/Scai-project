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
        .get(
          this.rootUrl +
            'notification/getNotification/' +
            this.accountService.getId()
        )
        .subscribe((data: Notification[]) => {
          this.notificationObject = data;
          this.getBasicData(this.notificationObject);
          resolve(this.notificationObject);
        });
    });
  }

  async getBasicData(notifications: Notification[]) {
    for (let not of notifications) {
      const find = this.basicData.find(
        (item) => item.idAccount == not.notCreator
      );
      if (!find) {
        const data = await this.accountService.getBasicAccountDetails(
          not.notCreator
        );
        this.basicData.push(data);
        not.doneBy = data;
      } else {
        not.doneBy = find;
      }
    }
  }

  notHasBeenSeen(id: number) {
    this.http
      .put(this.rootUrl + 'notification/notificationSeen/' + id, {})
      .subscribe();
  }
}
