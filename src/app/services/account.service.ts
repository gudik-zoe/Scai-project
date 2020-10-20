import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userData: Account;
  imageSubject = new Subject<boolean>();
  loggedIn = new Subject<boolean>();
  // refresh = new Subject<boolean>();
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  getUsers() {
    return this.http.get('http://localhost:8080/api/accounts');
  }

  getData() {
    return this.http.get('http://localhost:8080/api/accounts/' + this.getId());
  }

  async getUserData() {
    const id = this.getId();
    return new Promise<Account>((resolve) => {
      this.http
        .get('http://localhost:8080/api/accounts/' + id)
        .subscribe((data: Account) => {
          this.userData = data;
          resolve(this.userData);
        });
    });
  }

  getBasicAccountDetails(id: number) {
    return new Promise<AccountBasicData>((resolve) => {
      this.http
        .get('http://localhost:8080/api/accounts/details/' + id)
        .subscribe((data: AccountBasicData) => {
          resolve(data);
        });
    });
  }

  getAccountById(accountId: number) {
    return this.http.get('http://localhost:8080/api/accounts/' + accountId);
  }

  getAccountIdByPostId(postId: number) {
    return new Promise((resolve) => {
      this.http
        .get(
          'http://localhost:8080/api/accounts/getAccountIdByPostId/' + postId
        )
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  updateAccount(data) {
    data.idAccount = this.getId();
    console.log(data);
    return this.http.put('http://localhost:8080/api/accounts/', data);
  }

  deleteAccount() {
    return this.http.delete(
      'http://localhost:8080/api/accounts/' + this.getId()
    );
  }
}
