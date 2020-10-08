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
    return !!localStorage.getItem('token');
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
      'http://localhost:8080/api/login',
      {
        email: email,
        password: password,
      },
      { observe: 'response' }
    );
  }

  constructor(private http: HttpClient) {}
}
