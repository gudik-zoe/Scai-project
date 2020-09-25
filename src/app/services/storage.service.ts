import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  userData;
  constructor(
    private auth: AuthService,
    private accountService: AccountService
  ) {}
  message = new Subject<boolean>();

  // getUserData() {
  //   this.backEnd.getData().subscribe((data) => {
  //     this.userData = data;
  //   });
  // }

  getName() {
    return this.accountService.userData.firstName;
  }

  getImage(): string {
    return 'https://www.w3schools.com/howto/img_avatar.png';
  }
  getCoverPhoto(): string {
    return 'https://www.w3schools.com/howto/img_avatar.png';
  }

  getFriends() {
    return 2;
  }

  getLastName() {
    return 'khourya';
  }
  getEmail() {
    return this.accountService.userData.email;
  }
  getPassword() {
    return this.accountService.userData.password;
  }
  getConfirmPassword() {
    return this.accountService.userData.password;
  }
  getGender() {
    return this.accountService.userData.gender;
  }
  getStudy() {
    return this.accountService.userData.study;
  }
  getWentTo() {
    return this.accountService.userData.wentTo;
  }
  // getFrom() {
  //   return this.accountService.userData.city;
  // }
  getLivesIn() {
    return this.accountService.userData.livesIn;
  }
  getUserPosts() {
    return null;
  }
  getMessages() {
    return 3;
  }
}
