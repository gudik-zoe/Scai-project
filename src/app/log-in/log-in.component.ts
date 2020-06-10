import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from './validator';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(private fb: FormBuilder, private route: Router , private service:AuthService) {}
  signUp = true;
  user;
  changePassword = false;
  dataSaved = false;
  error = false

  signUpfunc() {
    //  this.user = this.signUpForm.get('name').value
    localStorage.setItem('key', JSON.stringify(this.signUpForm.value));
    this.dataSaved = true;
  }

  changePasswordfunc() {
    localStorage.setItem('key', JSON.stringify(this.signUpForm.value));
  }
  getEmail(){
   if (JSON.parse(localStorage.getItem('key')).email == null){
     console.log('hey')
   }else {
     return JSON.parse(localStorage.getItem('key')).email
   }
  }

  hey(){
    this.service.loggedIn()
  }

  signIn() {
    let email = this.signInForm.get('email').value;
    let password = this.signInForm.get('password').value;
    if (
      email === JSON.parse(localStorage.getItem('key')).email &&
      password === JSON.parse(localStorage.getItem('key')).password
    ) {
      console.log('registered');
      this.changePassword = true;
      this.route.navigate(['/home-page']);
    } else {
      this.error = true
      console.log('not registered');
    }
  }

  ok(){
    this.error = false
  }

  switch() {
    this.signUp = !this.signUp;
  }

  change() {
    this.changePassword = true;
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
      },
      { validator: [Custome.PasswordConfirmation] }
    );
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
