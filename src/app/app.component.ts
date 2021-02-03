import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
    private mediaObserver: MediaObserver
  ) {}
  deviceXs: boolean;
  mediaSub: Subscription;
  loggedInSubscription: Subscription;
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
    this.mediaSub.unsubscribe();
  }

  getScreenSize() {
    this.mediaSub = this.mediaObserver.media$.subscribe(
      (result: MediaChange) => {
        console.log(result.mqAlias);
        this.deviceXs = result.mqAlias === 'xs' ? true : false;
      }
    );
  }
  open: boolean;

  ngOnInit() {
    this.loggedInSubscription = this.accountService.loggedIn.subscribe(
      (data: boolean) => {
        this.open = data;
      }
    );
    this.open = localStorage.getItem('token') ? true : false;
    this.getScreenSize();
  }
}
