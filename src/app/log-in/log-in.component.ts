import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(private auth: AuthService) {}
  signUp: boolean = false;
  // dataSaved: boolean = false;
  error: boolean = false;
  emailExistError: boolean = false;
  loading: boolean = false;

  errorPhrase: string = '';

  signUpAgain(): void {
    this.emailExistError = false;
  }

  ok(): void {
    this.error = false;
  }

  getSignUpSuccessgful() {
    this.auth.signUpSuccessful.subscribe((data: boolean) => {
      this.signUp = data;
    });
  }

  switch() {
    this.signUp = !this.signUp;
  }
  ngOnInit(): void {
    this.getSignUpSuccessgful();
  }
}
