import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Account } from '../models/account';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errorPhrase: string;
  loading: boolean = false;
  emailError: boolean = false;
  passwordError: boolean = false;

  @Output() goToSignIn = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  signUpfunc(account: Account): void {
    this.loading = true;
    if (account.gender == 'male') {
      account.profilePhoto = 'https://i.ibb.co/ZYz6p60/download-3.jpg';
    } else {
      account.profilePhoto = 'https://i.ibb.co/nCJRcYk/Unknown-Girl.jpg';
    }
    account.coverPhoto = 'https://i.ibb.co/7JmwPtK/nature-design.jpg';
    this.auth.signUp(account).subscribe(
      (data: Account) => {
        this.loading = false;
        this.errorPhrase = '';
        this.auth.openSignInComponent.next(true);
      },
      (error) => {
        if (error.error.message.startsWith('this')) {
          this.errorPhrase = error.error.message;
          this.loading = false;
          this.emailError = true;
        } else if (error.error.message.startsWith('a valid')) {
          this.errorPhrase = error.error.message;
          this.passwordError = true;
          this.loading = false;
        }
        setTimeout(() => {
          this.loading = false;
          this.errorPhrase = '';
          this.passwordError = false;
          this.emailError = false;
        }, 3000);
      }
    );
  }

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
  }
}
