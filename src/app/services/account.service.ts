import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { ImgUrl } from '../models/imgUrl';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userData: AccountBasicData;
  peopleYouMayKnow: AccountBasicData[];
  imageSubject = new Subject<string>();
  loggedIn = new Subject<boolean>();
  errorSubject = new Subject<any>();
  rootUrl: string = environment.rootUrl;
  accountBasicData: AccountBasicData[] = [];
  requestedUserData: Account;
  myFriends: AccountBasicData[];

  constructor(private http: HttpClient) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  getPeopleYouMayKnow() {
    return new Promise<AccountBasicData[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'api/account/peopleYouMayKnow')
        .subscribe((data: AccountBasicData[]) => {
          this.peopleYouMayKnow = data;
          resolve(this.peopleYouMayKnow);
          reject('uknown error occured');
        });
    });
  }

  getAccountFriends() {
    return new Promise<AccountBasicData[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'api/account/friends')
        .subscribe((data: AccountBasicData[]) => {
          this.myFriends = data;
          resolve(this.myFriends);
          reject('unknown error occured');
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

  updateProfilePhoto(event) {
    return this.http.put(
      this.rootUrl + 'api/accounts/profilePhoto/accountId',
      this.uploadAnImage(event)
    );
  }

  updateCoverPhoto(event) {
    return this.http.put(
      this.rootUrl + 'api/accounts/coverPhoto/accountId',
      this.uploadAnImage(event)
    );
  }

  updateEmail(email: string) {
    return this.http.put(this.rootUrl + 'api/accounts/updateEmail', email);
  }

  updatePassword(password: string) {
    return this.http.put(
      this.rootUrl + 'api/accounts/updatePassword',
      password
    );
  }

  deleteAccount() {
    return this.http.delete(this.rootUrl + 'api/accounts/accountId');
  }

  uploadAnImage(event) {
    // return new Promise<FormData>((resolve, reject) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      // formData.append('text', 'hello world');
      return formData;
      //     resolve(formData);
      //     reject('unknown error happened');
      //   }
      // });
    }
  }
}
