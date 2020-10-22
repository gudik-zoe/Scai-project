import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userData: Account;
  imageSubject = new Subject<boolean>();
  loggedIn = new Subject<boolean>();
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  getUsers() {
    return this.http.get(this.rootUrl + 'api/accounts');
  }

  getData() {
    return this.http.get(this.rootUrl + 'api/accounts/' + this.getId());
  }

  async getUserData() {
    const id = this.getId();
    return new Promise<Account>((resolve) => {
      this.http
        .get(this.rootUrl + 'api/accounts/' + id)
        .subscribe((data: Account) => {
          this.userData = data;
          resolve(this.userData);
        });
    });
  }

  getBasicAccountDetails(id: number) {
    return new Promise<AccountBasicData>((resolve) => {
      this.http
        .get(this.rootUrl + 'api/accounts/details/' + id)
        .subscribe((data: AccountBasicData) => {
          resolve(data);
        });
    });
  }

  getAccountById(accountId: number) {
    return this.http.get(this.rootUrl + 'api/accounts/' + accountId);
  }

  getAccountIdByPostId(postId: number) {
    return new Promise((resolve) => {
      this.http
        .get(this.rootUrl + 'api/accounts/getAccountIdByPostId/' + postId)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  updateAccount(account: Account) {
    account.idAccount = this.getId();
    return this.http.put(this.rootUrl + 'api/accounts/', account);
  }

  deleteAccount() {
    return this.http.delete(this.rootUrl + 'api/accounts/' + this.getId());
  }
}
