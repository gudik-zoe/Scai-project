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
  // current = JSON.parse(localStorage.getItem('key'));
  loggedIn() {
    return !!localStorage.getItem('key');
  }
  signUp(data) {
    this.localStorageArray.push(data);
    if (data.gender === 'male') {
      data.image =
        'https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png';
    } else {
      data.image =
        'https://image.freepik.com/vettori-gratuito/avatar-ragazza-sorridente_102172-32.jpg';
    }
    if (data.coverPhoto === null) {
      data.coverPhoto = 'https://i.ytimg.com/vi/uNCr7NdOJgw/maxresdefault.jpg';
    }
    localStorage.setItem('user', JSON.stringify(this.localStorageArray));
  }

  check(email: string) {
    if (this.localStorageArray !== null) {
      return this.localStorageArray.some((item) => item.email === email);
    }
  }

  signIn(email: string, password: any) {
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

  constructor() {}
}
