import { Injectable } from '@angular/core';
import { AuthService } from './log-in/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private auth: AuthService) {}

  getName() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .name;
  }

  getImage() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .image;
  }

  getFriends() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .friends;
  }

  getLastName() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .lastName;
  }
  getEmail() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .email;
  }
  getPassword() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .password;
  }
  getConfirmPassword() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .confirmPassword;
  }
  getGender() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .gender;
  }
  getStudy() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .study;
  }
  getWentTo() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .wentTo;
  }
  getFrom() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .from;
  }
  getLivesIn() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .livesIn;
  }
  getUserPosts() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .posts;
  }
}
