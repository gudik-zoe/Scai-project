import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
import { Notification } from '../models/notification';
import { NotificationDetails } from '../models/notificationDetails';
import { AccountService } from '../services/account.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[];
  unseenNots: number = 0;
  userData: AccountBasicData;
  haveNotification: boolean;
  basicData: AccountBasicData[] = [];
  imgUrl: string = environment.rootUrl + 'files/';
  now: number = new Date().getTime();
  limit: number = 5;
  restOfTheNotifications: Notification[];
  restNotsLoaded: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService,
    private route: Router
  ) {}
  ngOnDestroy() {
    this.clearInterval();
  }

  notificationSound = new Audio('../../assets/juntos-607.mp3');

  async getNotifications() {
    this.notifications = await this.notificationService.getNotification();
    this.notifications.length == 0
      ? (this.haveNotification = false)
      : (this.haveNotification = true);
    for (let not of this.notifications) {
      if (!not.seen) {
        this.notificationSound.play();
        this.unseenNots++;
      }
    }
  }

  notificationSeen(notificationId: number) {
    this.notificationService
      .notHasBeenSeen(notificationId)
      .subscribe((data) => {
        this.unseenNots--;
        for (let not of this.notifications) {
          if (not.idNotification == notificationId) {
            not.seen = true;
          }
        }
      });
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  goToDescription(not: Notification) {
    this.route.navigate(['/description', not.relatedPostId]);
    if (!not.seen) {
      this.notificationSeen(not.idNotification);
    }
  }

  interval;
  startInterval() {
    this.interval = setInterval(() => {
      this.getNotifications();
    }, 60000);
  }

  clearInterval() {
    clearInterval(this.interval);
  }

  seeAll() {
    this.notificationService.allNotificationsSeen().subscribe((data) => {
      for (let not of this.notifications) {
        if (!not.seen) {
          this.unseenNots = 0;
          not.seen = true;
        }
      }
    });
  }

  load() {
    if (
      this.notifications.length == this.notificationDetails.notificationNumber
    ) {
      console.log('that would be all am not loading any more');
    } else {
      console.log('load more');
    }
  }

  @HostListener('scroll', ['$event'])
  async onScroll(event: any) {
    const lastIndex = this.notifications[this.notifications.length - 1]
      .idNotification;
    if (
      event.target.offsetHeight + event.target.scrollTop >=
      event.target.scrollHeight
    ) {
      if (
        this.notifications.length == this.notificationDetails.notificationNumber
      ) {
        console.log('that would be all');
      } else {
        this.restOfTheNotifications = await this.notificationService.loadMore(
          lastIndex
        );
        for (let not of this.restOfTheNotifications) {
          this.notifications.push(not);
        }
      }
    }
  }

  notificationDetails: NotificationDetails;
  getNotsDetails() {
    this.notificationService
      .getNotificationDetails()
      .subscribe((data: NotificationDetails) => {
        this.notificationDetails = data;
        this.unseenNots = this.notificationDetails.unseenNotsNumber;
      });
  }

  ngOnInit() {
    this.getUserData();
    this.getNotifications();
    this.getNotsDetails();
    this.startInterval();
  }
}
