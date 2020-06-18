import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users = [];
  error = false;

  localStorageArray = JSON.parse(localStorage.getItem('user')) || [];
  requestedUserIndex;
  currentUser = [];

  loggedIn() {
    return !!localStorage.getItem('key');
  }
  signUp(data) {
    this.localStorageArray.push(data);
    localStorage.setItem('user', JSON.stringify(this.localStorageArray));
  }

  check(email) {
    if (this.localStorageArray !== null) {
      return this.localStorageArray.some((item) => item.email === email);
    }
  }

  signIn(email, password) {
    this.requestedUserIndex = this.localStorageArray.findIndex(
      (item) => item.email === email && item.password === password
    );
    if (this.requestedUserIndex !== -1) {
      localStorage.setItem('key', String(this.requestedUserIndex));

      return true;
    } else {
      return false;
    }
  }
  // logOut() {
  // //  this.currentUser = []
  //  this.signedIn.next(false)

  // }

  constructor() {}
}
