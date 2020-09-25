import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  signUp(data) {
    return this.http.post('http://localhost:8080/api/signUp', data);
  }

  check(email: string): boolean {
    if (this.localStorageArray !== null) {
      return this.localStorageArray.some((item) => item.email === email);
    }
  }

  signIn(email: string, password: any) {
    return this.http.post(
      'http://localhost:8080/login',
      {
        email: email,
        password: password,
      },
      { observe: 'response' }
    );
    // this.requestedUserIndex = this.localStorageArray.findIndex(
    //   (item) => item.email === email && item.password === password
    // );
    // if (this.requestedUserIndex !== -1) {
    //   localStorage.setItem('key', String(this.requestedUserIndex));
    //   return true;
    // } else {
    //   return false;
    // }
  }

  constructor(private http: HttpClient) {}
}
