import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  signUpfunc(account: Account): void {
    this.loading = true;
    if (account.gender == 'male') {
      account.profilePhoto = 'https://i.ibb.co/ZYz6p60/download-3.jpg';
    } else {
      account.profilePhoto = 'https://i.ibb.co/nCJRcYk/Unknown-Girl.jpg';
    }
    account.coverPhoto = 'https://i.ibb.co/7JmwPtK/nature-design.jpg';
    this.auth.signUp(account).subscribe(
      (data: boolean) => {
        this.loading = false;
        this.errorPhrase = '';
        this.auth.openSignInComponent.next(true);
      },
      (error) => {
        this.loading = false;
        this.snackBar.open(error.error.message, '', { duration: 2000 });
        this.signUpForm.get('email').setValue('');
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
