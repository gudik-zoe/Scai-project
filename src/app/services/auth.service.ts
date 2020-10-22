import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  error: boolean = false;

  localStorageArray: any[] = JSON.parse(localStorage.getItem('user')) || [];

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  signUp(account: Account) {
    return this.http.post('http://localhost:8080/api/signUp', account);
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
