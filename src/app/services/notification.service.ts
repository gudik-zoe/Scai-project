import { HttpClient } from '@angular/common/http';
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

  notHasBeenSeen(id: number) {
    this.http
      .put(this.rootUrl + 'notification/notificationSeen/' + id, {})
      .subscribe();
  }
}
