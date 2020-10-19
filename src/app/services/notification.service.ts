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
  addNotification(notification) {
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
          // console.log(this.notificationObject);
          resolve(this.notificationObject);
        });
    });
  }

  async getBasicData(nots) {
    for (let i of nots) {
      const find = this.basicData.find(
        (item) => item.idAccount == i.notCreator
      );
      if (!find) {
        const data = await this.accountService.getBasicAccountDetails(
          i.notCreator
        );
        this.basicData.push(data);
        i.doneBy = data;
      } else {
        i.doneBy = find;
      }
    }
  }

  notHasBeenSeen(id: number) {
    this.http
      .put(this.rootUrl + 'notification/notificationSeen/' + id, {})
      .subscribe();
  }
}
