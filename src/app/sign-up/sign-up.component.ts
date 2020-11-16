import { Component, OnInit } from '@angular/core';
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
  constructor(private fb: FormBuilder, private auth: AuthService) {}

  signUpfunc(account: Account): void {
    this.loading = true;
    if (account.gender == 'male') {
      account.profilePhoto = 'https://i.ibb.co/5F3tLbM/download-3.jpg';
    } else {
      account.profilePhoto = 'https://i.ibb.co/1sT6gNp/Unknown-Girl.jpg';
    }
    account.coverPhoto = 'https://i.ibb.co/fHnGMrJ/nature-design.jpg';
    this.auth.signUp(account).subscribe(
      (data) => {
        this.auth.signUpSuccessful.next(false);
        this.loading = false;
        this.errorPhrase = '';
        // this.signUp = false;
      },
      (error) => {
        this.errorPhrase = error.error.message;
        this.loading = false;
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
