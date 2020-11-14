import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from './validator';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';
import { AccountService } from '../services/account.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Account } from '../models/account';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private postService: PostsService,
    private accountService: AccountService,
    private http: HttpClient
  ) {}
  signUp: boolean = false;
  // dataSaved: boolean = false;
  error: boolean = false;
  emailExistError: boolean = false;
  imgUrl: string = environment.rootUrl + 'files/';

  errorPhrase: string = '';

  signUpfunc(account: Account): void {
    if (account.gender == 'male') {
      account.profilePhoto = 'https://i.ibb.co/5F3tLbM/download-3.jpg';
    } else if (account.gender == 'female') {
      account.profilePhoto = 'https://i.ibb.co/1sT6gNp/Unknown-Girl.jpg';
    }
    account.coverPhoto = 'https://i.ibb.co/fHnGMrJ/nature-design.jpg';
    this.auth.signUp(account).subscribe(
      (data) => {
        this.errorPhrase = '';
        this.signUp = false;
      },
      (error) => (this.errorPhrase = error.error.message)
    );
  }

  signUpAgain(): void {
    this.emailExistError = false;
    this.signUpForm.get('email').reset();
  }

  signIn(email: string, password: string) {
    this.auth.signIn(email, password).subscribe(
      (data) => {
        this.errorPhrase = '';
        localStorage.setItem('token', data.headers.get('Authorization'));
        this.accountService.loggedIn.next(true);
        this.route.navigate(['/home-page']);
      },
      (error) => {
        this.errorPhrase = error.error.message;
      }
    );
  }

  ok(): void {
    this.error = false;
  }

  switch(): void {
    this.signUp = !this.signUp;
    this.signUpForm.reset();
    this.errorPhrase = '';
  }

  signUpForm: FormGroup;
  signInForm: FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        image: [''],
        coverPhoto: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
      },
      { validator: [Custome.PasswordConfirmation, Custome.passwordPattern] }
    );
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
}
