import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any[] = [];
  error: boolean = false;

  localStorageArray: any[] = JSON.parse(localStorage.getItem('user')) || [];
  requestedUserIndex: number;
  currentUser: any[] = [];

  loggedIn(): boolean {
    return !!localStorage.getItem('key');
  }
  signUp(data): void {
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

  check(email: string): boolean {
    if (this.localStorageArray !== null) {
      return this.localStorageArray.some((item) => item.email === email);
    }
  }

  signIn(email: string, password: any): boolean {
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
