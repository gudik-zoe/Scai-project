import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  userData;
  constructor(private http: HttpClient) {}

  getId() {
    const decoded = jwt_decode(localStorage.getItem('token'));
    return decoded.userid;
  }

  //  { headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token'),
  //   }),
  // }
  getData() {
    return this.http.get('http://localhost:8080/api/accounts/' + this.getId());
  }

  getUserData() {
    return this.http
      .get('http://localhost:8080/api/accounts/' + this.getId())
      .subscribe((data) => {
        this.userData = data;
      });
  }

  getAccountById(accountId) {
    return this.http.get('http://localhost:8080/api/accounts/' + accountId);
  }

  updateAccount(data) {
    data.idAccount = this.getId();
    console.log(data);
    return this.http.put('http://localhost:8080/api/accounts/', data);
  }

  deleteAccount() {
    console.log(this.getId());
    return this.http.delete(
      'http://localhost:8080/api/accounts/' + this.getId()
    );
  }
}
