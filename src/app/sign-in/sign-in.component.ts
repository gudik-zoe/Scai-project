import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  signUpSuccessfull: boolean = false;
  fieldError: boolean = false;
  constructor(
    private auth: AuthService,
    private accountService: AccountService,
    private route: Router,
    private fb: FormBuilder
  ) {}

  showPassword: boolean;
  signInForm: FormGroup;

  fillSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  showThePassword() {
    this.showPassword = !this.showPassword;
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

  ngOnInit() {
    this.fillSignInForm();
  }
}
