import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
import { Page } from '../models/page';
import { AccountService } from '../services/account.service';
import { ChatService } from '../services/chat.service';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private pageService: PagesService
  ) {}

  userData: AccountBasicData;
  myPages: Page[];
  imgUrl: string = environment.rootUrl + 'files/';

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  public subscribtion: Subscription;
  getTheUpdatedImage() {
    this.subscribtion = this.accountService.imageSubject.subscribe(
      (data: string) => {
        this.userData.profilePhoto = data;
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
