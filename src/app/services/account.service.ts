import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';

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
  allUsers: AccountBasicData[];

  constructor(private http: HttpClient) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  getAllUsers() {
    this.http.get(this.rootUrl + 'allUsers').subscribe((data: Account[]) => {
      console.log(data);
    });
  }

  getPeopleYouMayKnow() {
    return new Promise<AccountBasicData[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'account/peopleYouMayKnow')
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
        .get(this.rootUrl + 'account/friends')
        .subscribe((data: AccountBasicData[]) => {
          this.myFriends = data;
          resolve(this.myFriends);
          reject('unknown error occured');
        });
    });
  }
  getARandomUserData(accountId: number) {
    return this.http.get(this.rootUrl + 'accounts/' + accountId);
  }

  async getTheLoggedInUserData() {
    return new Promise<AccountBasicData>((resolve) => {
      this.http
        .get(this.rootUrl + 'accounts/idAccount/getLoggedInUserBasicData')
        .subscribe((data: AccountBasicData) => {
          this.userData = data;
          resolve(this.userData);
        });
    });
  }

  userFullData: Account;
  async getTheLoggedInUserDataFullData() {
    return new Promise<Account>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'accounts/idAccount/getLoggedInUserFullData')
        .subscribe(
          (data: Account) => {
            this.userFullData = data;
            resolve(this.userFullData);
          },
          (error) => reject(error.error.message)
        );
    });
  }

  getBasicAccountDetails(id: number) {
    const check = this.accountBasicData.find((item) => item.idAccount == id);
    if (check) {
      return check;
    } else {
      return new Promise<AccountBasicData>((resolve, reject) => {
        this.http.get(this.rootUrl + 'accounts/details/' + id).subscribe(
          (data: AccountBasicData) => {
            this.accountBasicData.push(data);

            resolve(data);
          },
          (error) => {
            reject(error.error.message);
          }
        );
      });
    }
  }

  getAccountById(id: number) {
    return new Promise<Account>((resolve, reject) => {
      this.http.get(this.rootUrl + 'accounts/' + id).subscribe(
        (data: Account) => {
          this.requestedUserData = data;
          resolve(this.requestedUserData);
        },
        (error) => {
          reject(error.error.message);
        }
      );
    });
  }

  // getAccountIdByPostId(postId: number) {
  //   return new Promise((resolve) => {
  //     this.http
  //       .get(this.rootUrl + ' accounts/getAccountIdByPostId/' + postId)
  //       .subscribe((data) => {
  //         resolve(data);
  //       });
  //   });
  // }

  updateAccount(account: Account) {
    return this.http.put(this.rootUrl + 'accounts/updateAccount', account);
  }

  updateProfilePhoto(event) {
    return this.http.put(
      this.rootUrl + 'accounts/profilePhoto/accountId',
      this.uploadAnImage(event)
    );
  }

  updateCoverPhoto(event) {
    return this.http.put(
      this.rootUrl + 'accounts/coverPhoto/accountId',
      this.uploadAnImage(event)
    );
  }

  updateEmail(formData: FormData) {
    return this.http.put(this.rootUrl + 'accounts/updateEmail', formData);
  }

  updatePassword(formData: FormData) {
    return this.http.put(this.rootUrl + 'accounts/updatePassword', formData);
  }

  deleteAccount() {
    return this.http.delete(this.rootUrl + 'accounts/accountId');
  }

  uploadAnImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      return formData;
    }
  }

  uploadImage(event: any) {
    let photoObject = {};
    if (
      event.target.files.length > 0 &&
      event.target.files[0].type.includes('image')
    ) {
      return new Promise<any>((resolve, reject) => {
        const file = event.target.files[0];
        let temporaryImage;
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
          temporaryImage = event.target.result;
          if (file != null && temporaryImage != null) {
            (photoObject['formData'] = file),
              (photoObject['temporaryImage'] = temporaryImage);
            resolve(photoObject);
          } else {
            reject(null);
          }
        };
      });
    } else {
      return null;
    }
  }

  photos: string[];
  getAccountPhotos(accountId: number) {
    return new Promise<string[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'account/photos/' + accountId)
        .subscribe((data: string[]) => {
          this.photos = data;
          resolve(this.photos);
          reject('unknown error occured');
        });
    });
  }

  getAnAccountFriend(otherAccountId: number) {
    return new Promise<AccountBasicData[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'account/mutualFriends/' + otherAccountId)
        .subscribe((data: AccountBasicData[]) => {
          resolve(data);
        });
    });
  }
}
