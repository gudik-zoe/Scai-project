import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  notificationObject;
  basicData = [];
  rootUrl: string = environment.rootUrl;
  addNotification(notification) {
    return this.http.post(
      this.rootUrl + 'notification/addNotification',
      notification
    );
  }

  getNotification() {
    return new Promise((resolve) => {
      this.http
        .get(
          this.rootUrl +
            'notification/getNotification/' +
            this.accountService.getId()
        )
        .subscribe((data) => {
          this.notificationObject = data;
          resolve(this.notificationObject);
        });
    });
  }

  async getBasicData() {
    for (let i of this.notificationObject) {
      const check = this.basicData.some(
        (item) => item.idAccount == i.notCreator
      );
      if (!check) {
        const data = await this.accountService.getBasicAccountDetails2(
          i.notCreator
        );
        this.basicData.push(data);
        i.doneBy = data;
      } else {
        for (let j of this.basicData) {
          if (j.idAccount == i.notCreator) {
            i.doneBy = j;
          }
        }
      }
    }

    console.log(this.basicData);
    console.log(this.notificationObject);
  }

  notHasBeenSeen(id: number) {
    this.http
      .put(this.rootUrl + 'notification/notificationSeen/' + id, {})
      .subscribe();
  }
}
