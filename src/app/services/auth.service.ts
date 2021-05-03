import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootUrl: string = environment.rootUrl;
  error: boolean = false;
  openSignInComponent = new Subject<boolean>();
  signUpSuccessfull = new Subject<boolean>();
  deviseXs = new Subject<boolean>();

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  signUp(account: Account) {
    return this.http.post(this.rootUrl + 'signUp', account);
  }

  signIn(loginDto: Login) {
    return this.http.post(this.rootUrl + 'login', loginDto, {
      observe: 'response',
    });
  }

  resetPassword(email: string) {
    return this.http.post(this.rootUrl + 'resetPassword', email);
  }

  checkTempPassword(temporaryPassword: String) {
    console.log(temporaryPassword);
    return this.http.post(
      this.rootUrl + 'checkTempPassword',
      temporaryPassword
    );
  }

  constructor(private http: HttpClient) {}
}
