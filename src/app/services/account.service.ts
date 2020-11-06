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
  errorSubject = new Subject<any>();
  rootUrl: string = environment.rootUrl;
  accountBasicData: AccountBasicData[] = [];
  constructor(private http: HttpClient) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  getUsers() {
    return this.http.get(this.rootUrl + 'api/accounts');
  }

  getARandomUserData(accountId: number) {
    return this.http.get(this.rootUrl + 'api/accounts/' + accountId);
  }

  async getTheLoggedInUserData() {
    return new Promise<Account>((resolve) => {
      this.http
        .get(this.rootUrl + 'api/accounts/idAccount/getLoggedInUser')
        .subscribe((data: Account) => {
          this.userData = data;
          resolve(this.userData);
        });
    });
  }

  getBasicAccountDetails(id: number) {
    const check = this.accountBasicData.find((item) => item.idAccount == id);
    if (check) {
      return check;
    } else {
      return new Promise<AccountBasicData>((resolve) => {
        this.http
          .get(this.rootUrl + 'api/accounts/details/' + id)
          .subscribe((data: AccountBasicData) => {
            this.accountBasicData.push(data);
            resolve(data);
          });
      });
    }
  }

  getAccountById(id: number) {
    return this.http.get(this.rootUrl + 'api/accounts/' + id);
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
    return this.http.put(this.rootUrl + 'api/accounts/updateAccount', account);
  }

  deleteAccount() {
    return this.http.delete(this.rootUrl + 'api/accounts/accountId');
  }
}
