import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Account } from '../models/account';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-change-email-pass',
  templateUrl: './change-email-pass.component.html',
  styleUrls: ['./change-email-pass.component.css'],
})
export class ChangeEmailPassComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder
  ) {}
  userData: Account;
  emailErrorPhrase: string = '';
  passwordErrorPhrase: string = '';
  changeEmail: FormGroup;
  changePassword: FormGroup;
  emailHasBeenChanged: boolean = false;
  passwordHasBeenChanged: boolean = false;
  imgUrl: string = environment.rootUrl + 'files/';
  async getUserData() {
    this.userData = await this.accountService.getAccountById(
      this.accountService.getId()
    );
    this.fillChangeEmailFormValue();
    this.fillChangePasswordFormValue();
  }

  confirmUpdateEmail(email: string, password: string) {
    const formData = new FormData();
    formData.append('newEmail', email);
    formData.append('password', password);
    this.accountService.updateEmail(formData).subscribe(
      (data) => {
        this.emailHasBeenChanged = true;
        setTimeout(() => {
          this.emailHasBeenChanged = false;
          this.changeEmail.reset();
        }, 2000);
      },
      (error) => (this.emailErrorPhrase = error.error.message)
    );
  }

  confirmUpdatePassword(oldPassword: string, newPassword: string) {
    const formData = new FormData();
    formData.append('oldPassword', oldPassword);
    formData.append('newPassword', newPassword);
    this.accountService.updatePassword(formData).subscribe(
      (data) => {
        this.passwordHasBeenChanged = true;
        setTimeout(() => {
          this.passwordHasBeenChanged = false;
          this.changePassword.reset();
        }, 2000);
      },
      (error) => (this.passwordErrorPhrase = error.error.message)
    );
  }

  fillChangeEmailFormValue() {
    this.changeEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  fillChangePasswordFormValue() {
    this.changePassword = this.fb.group(
      {
        currentPassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: [Custome.changePassword, Custome.passwordPattern] }
    );
  }
  ngOnInit() {
    this.getUserData();
  }
}
