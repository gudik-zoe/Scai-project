import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { Account } from '../models/account';
import { Login } from '../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  resetPasswordForm: FormGroup;
  constructor(
    private auth: AuthService,
    private accountService: AccountService,
    private route: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  showPassword: boolean;
  signInForm: FormGroup;
  resetPasswordActive: boolean = false;
  theRequestedEmail: string;
  tempPassword: string;
  email: string;
  forgotPassword: boolean = false;

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
    const loginDto: Login = { email, password };
    this.auth.signIn(loginDto).subscribe(
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

  sendEmail(email: string) {
    this.loading = true;
    this.auth.resetPassword(email).subscribe(
      (data: Account) => {
        console.log(data);
        if (data != null) {
          this.loading = false;
          this.theRequestedEmail = data.email;
          this.snackBar.open(
            'enter the temporary password that was sent to the entered email',
            '',
            {
              duration: 4000,
              panelClass: 'snackbar',
            }
          );
          this.resetPasswordActive = true;
        }
      },
      (error) => {
        this.errorPhrase = error.error.message;
        this.loading = false;
      }
    );
  }
  resetPassword() {
    if (!this.forgotPassword) {
      this.forgotPassword = true;
    } else {
      this.errorPhrase = null;
      if (
        this.signInForm.get('email').value == null ||
        this.signInForm.get('email').value == ''
      ) {
        this.errorPhrase = 'enter a mail to be abel to reset the password';
      } else {
        this.sendEmail(this.signInForm.get('email').value);
      }
    }
  }

  fillResetPasswordForm() {
    this.resetPasswordForm = this.fb.group({
      tempPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  goToLoginInParent(data: boolean) {
    if (data) {
      this.resetPasswordActive = false;
      this.forgotPassword = false;
    }
  }

  ngOnInit() {
    this.fillSignInForm();
    this.fillResetPasswordForm();
  }
}
