import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  errorPhrase: string;
  loading: boolean = false;
  weila: boolean;
  fieldError: boolean = false;
  constructor(
    private auth: AuthService,
    private accountService: AccountService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  signInForm: FormGroup;

  fillSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  signIn(email: string, password: string) {
    this.loading = true;
    this.auth.signIn(email, password).subscribe(
      (data) => {
        this.errorPhrase = '';
        localStorage.setItem('token', data.headers.get('Authorization'));
        this.accountService.loggedIn.next(true);
        this.route.navigate(['/home-page']);
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.errorPhrase = error.error.message;
        this.fieldError = true;
        setTimeout(() => {
          this.errorPhrase = '';
          this.fieldError = false;
        }, 2000);
      }
    );
  }

  getSignUpSuccessful() {
    this.auth.signUpSuccessful.subscribe((data: boolean) => {
      this.weila = true;
      setTimeout(() => {
        this.weila = false;
      }, 5000);
    });
  }

  ngOnInit() {
    this.fillSignInForm();
    this.getSignUpSuccessful();
  }
}
