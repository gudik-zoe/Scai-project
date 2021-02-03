import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';

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
    return this.http.post(this.rootUrl + 'api/signUp', account);
  }

  signIn(email: string, password: any) {
    return this.http.post(
      this.rootUrl + 'api/login',
      {
        email: email,
        password: password,
      },
      { observe: 'response' }
    );
  }

  constructor(private http: HttpClient) {}
}
