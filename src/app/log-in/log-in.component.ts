import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from './validator';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostsService } from '../services/posts.service';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';

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
  signUp: boolean = true;
  dataSaved: boolean = false;
  error: boolean = false;
  logged = [];
  emailExist: boolean = false;
  theAccountObject;
  userProfilePhoto;

  signUpfunc(data: any): void {
    this.auth.signUp(data).subscribe((data) => {
      console.log('u ha been registered');
      console.log(data);
      this.signUp = false;
    });
  }

  signUpAgain(): void {
    this.emailExist = false;
    this.signUpForm.reset();
  }

  signIn(email: string, password: any) {
    this.auth.signIn(email, password).subscribe(
      (data) => {
        localStorage.setItem('token', data.headers.get('Authorization'));
        this.accountService.refresh.next(true);
        this.accountService.loggedIn.next(true);
        this.route.navigate(['/home-page']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ok(): void {
    this.error = false;
  }

  switch(): void {
    this.signUp = !this.signUp;
    this.dataSaved = false;
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
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
      },
      { validator: [Custome.PasswordConfirmation] }
    );
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    // this.accountService.getData().subscribe((data) => {
    //   this.theAccountObject = data;
    //   this.http
    //     .get(
    //       'http://localhost:8080/files/' + this.theAccountObject.profilePhoto,
    //       {
    //         responseType: 'blob',
    //       }
    //     )
    //     .subscribe((data) => {
    //       this.accountService.userData.profilePhoto = data;
    //     });
    // });
  }
}
