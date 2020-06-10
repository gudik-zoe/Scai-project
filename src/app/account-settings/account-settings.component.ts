import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router) {}
  changePassword = false;
  newUser;
  passwordHasBeenChanged = false;

  getName() {
    return JSON.parse(localStorage.getItem('key')).name;
  }
  getLastName() {
    return JSON.parse(localStorage.getItem('key')).lastName;
  }
  getEmail() {
    return JSON.parse(localStorage.getItem('key')).email;
  }
  getPassword() {
    return JSON.parse(localStorage.getItem('key')).password;
  }
  getConfirmPassword() {
    return JSON.parse(localStorage.getItem('key')).confirmPassword;
  }
  change() {
    this.changePassword = true;
  }
  goToHome() {
    this.route.navigate(['/home-page']);
  }
  confirm() {
    this.newUser = {
      name: JSON.parse(localStorage.getItem('key')).name,
      lastName: JSON.parse(localStorage.getItem('key')).lastName,
      email: JSON.parse(localStorage.getItem('key')).email,
      password: this.changePasswordForm.get('newPassword').value,
      confirmPassword: this.changePasswordForm.get('confirmNewPassword').value,
      gender: JSON.parse(localStorage.getItem('key')).gender,
      study: this.changePasswordForm.get('study').value,
      wentTo: this.changePasswordForm.get('wentTo').value,
      livesIn: this.changePasswordForm.get('livesIn').value,
      from: this.changePasswordForm.get('from').value,
    };
    localStorage.setItem('key', JSON.stringify(this.newUser));
    this.passwordHasBeenChanged = true;
    this.changePassword = false;
  }
  ngOnInit() {
    this.changePasswordForm = this.fb.group(
      {
        email: [this.getEmail(), [Validators.required, Validators.email]],
        newPassword: [
          this.getPassword(),
          [Validators.required, Validators.minLength(6)],
        ],
        confirmNewPassword: [this.getConfirmPassword(), Validators.required],
        study: [''],
        wentTo: [''],
        livesIn: [''],
        from: [''],
      },
      { validator: [Custome.changePassword] }
    );
  }
}
