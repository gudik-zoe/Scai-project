import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(private accountService: AccountService, private route: Router) {}

  userData: AccountBasicData;
  imgUrl: string = environment.rootUrl + 'files/';
  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  public subscribtion: Subscription;
  getTheUpdatedImage() {
    this.subscribtion = this.accountService.imageSubject.subscribe(
      async (data: boolean) => {
        if (data) {
          this.userData = await this.accountService.getTheLoggedInUserData();
        }
      }
    );
  }

  goToChat() {
    this.route.navigate(['/chat']);
  }
  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
  ngOnInit() {
    this.getUserData();
    this.getTheUpdatedImage();
  }
}
