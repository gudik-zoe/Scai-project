import { Injectable } from '@angular/core';
import { AuthService } from './log-in/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private auth: AuthService) {}
  message = new Subject<boolean>();

  getName(): string {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .name;
  }

  getImage(): string {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      ?.image;
  }
  getCoverPhoto(): string {
    return String(
      this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
        .coverPhoto
    );
  }

  getFriends() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .friends;
  }

  getLastName(): String {
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
  getMessages() {
    return this.auth.localStorageArray[JSON.parse(localStorage.getItem('key'))]
      .messages;
  }
}
