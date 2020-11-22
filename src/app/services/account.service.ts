import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { ImgUrl } from '../models/imgUrl';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userData: AccountBasicData;
  users: Account[];
  imageSubject = new Subject<boolean>();
  loggedIn = new Subject<boolean>();
  errorSubject = new Subject<any>();
  rootUrl: string = environment.rootUrl;
  accountBasicData: AccountBasicData[] = [];
  requestedUserData: Account;

  constructor(private http: HttpClient) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  getUsers() {
    return new Promise<Account[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'api/accounts')
        .subscribe((data: Account[]) => {
          this.users = data;
          resolve(this.users);
          reject('uknown error occured');
        });
    });
  }

  getARandomUserData(accountId: number) {
    return this.http.get(this.rootUrl + 'api/accounts/' + accountId);
  }

  async getTheLoggedInUserData() {
    return new Promise<AccountBasicData>((resolve) => {
      this.http
        .get(this.rootUrl + 'api/accounts/idAccount/getLoggedInUserBasicData')
        .subscribe((data: AccountBasicData) => {
          this.userData = data;
          resolve(this.userData);
        });
    });
  }

  userFullData: Account;
  async getTheLoggedInUserDataFullData() {
    return new Promise<Account>((resolve) => {
      this.http
        .get(this.rootUrl + 'api/accounts/idAccount/getLoggedInUserFullData')
        .subscribe((data: Account) => {
          this.userFullData = data;
          resolve(this.userFullData);
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
    return new Promise<Account>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'api/accounts/' + id)
        .subscribe((data: Account) => {
          this.requestedUserData = data;
          resolve(this.requestedUserData);
          reject('unknown error occured');
        });
    });
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

  updateEmail(email: string) {
    return this.http.put(
      this.rootUrl + 'api/accounts/updateEmail/' + email,
      {}
    );
  }

  updatePassword(password: string) {
    return this.http.put(
      this.rootUrl + 'api/accounts/updatePassword/' + password,
      {}
    );
  }

  deleteAccount() {
    return this.http.delete(this.rootUrl + 'api/accounts/accountId');
  }

  uploadAnImage(event) {
    return new Promise<FormData>((resolve, reject) => {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        resolve(formData);
        reject('unknown error happened');
      }
    });
  }
}
