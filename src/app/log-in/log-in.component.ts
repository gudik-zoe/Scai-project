import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService) {}
  signUp: boolean = false;
  error: boolean = false;
  emailExistError: boolean = false;
  loading: boolean = false;
  signUpSuccessfull: boolean = false;
  errorPhrase: string = '';

  signUpAgain(): void {
    this.emailExistError = false;
  }

  ok(): void {
    this.error = false;
  }
  subscription: Subscription;
  getSignUpSuccessgful() {
    this.subscription = this.auth.openSignInComponent.subscribe(
      (data: boolean) => {
        this.signUp = data;
        this.signUpSuccessfull = true;
        setTimeout(() => {
          this.signUpSuccessfull = false;
        }, 3000);
      }
    );
  }

  switch() {
    this.signUp = !this.signUp;
  }
  ngOnInit(): void {
    this.getSignUpSuccessgful();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
