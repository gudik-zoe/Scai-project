import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from './validator';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private service: AuthService,
    private postService:PostsService
  ) {}
  signUp = true;  
  dataSaved = false;
  error = false;
  logged = []

  signUpfunc(data) {
    this.service.signUp(data)
    this.dataSaved = true;
  }

  changePasswordfunc(data) {
    this.service.changePasswordfunc(data)
  }

  signIn(email,password) {
      if (this.service.signIn(email,password)){
      this.postService.signedIn.push('in')
      this.error = false
      this.route.navigate(['/home-page']);
    } else {
      this.error = true
    }
  }

  ok() {
    this.error = false;
  }

  switch() {
    this.signUp = !this.signUp;
  }
 
  signUpForm: FormGroup;
  signInForm: FormGroup;
  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        study: [''],
        wentTo: [''],
        livesIn: [''],
        from: [''],
      },
      { validator: [Custome.PasswordConfirmation] }
    );
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
