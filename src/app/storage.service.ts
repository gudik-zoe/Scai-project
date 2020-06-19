import { Injectable } from '@angular/core';
import { AuthService } from './log-in/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private auth: AuthService) {}
  currentUser = this.auth.localStorageArray[
    JSON.parse(localStorage.getItem('key'))
  ];
  getName() {
    return this.currentUser.name;
  }

  getImage() {
    if (
      this.currentUser.image === null &&
      this.currentUser.gender == 'female'
    ) {
      return 'https://image.freepik.com/vettori-gratuito/avatar-ragazza-sorridente_102172-32.jpg';
    } else if (
      this.currentUser.image === null &&
      this.currentUser.gender == 'male'
    ) {
      return 'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png';
    } else {
      return this.currentUser.image;
    }
  }

  getLastName() {
    return this.currentUser.lastName;
  }
  getEmail() {
    return this.currentUser.email;
  }
  getPassword() {
    return this.currentUser.password;
  }
  getConfirmPassword() {
    return this.currentUser.confirmPassword;
  }
  getGender() {
    return this.currentUser.gender;
  }
  getStudy() {
    return this.currentUser.study;
  }
  getWentTo() {
    return this.currentUser.wentTo;
  }
  getFrom() {
    return this.currentUser.from;
  }
  getLivesIn() {
    return this.currentUser.livesIn;
  }
  getUserPosts() {
    return this.currentUser.posts;
  }
}
