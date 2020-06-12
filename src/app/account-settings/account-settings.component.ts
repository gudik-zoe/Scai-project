import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  changePasswordForm: FormGroup;
  constructor(private fb: FormBuilder, private route: Router , private storageService:StorageService) {}
  changePassword = false;
  newUser;
  passwordHasBeenChanged = false;

  change() {
    this.changePassword = !this.changePassword;
  }
  goToHome() {
    this.route.navigate(['/user-profile']);
  }

  getLastName(){
    return this.storageService.getLastName()
  }
  getName(){
    return this.storageService.getName()
  }
  confirm() {
    this.newUser = {
      name: this.storageService.getName(),
      lastName: this.storageService.getLastName(),
      email: this.changePasswordForm.get('email').value,
      password: this.changePasswordForm.get('newPassword').value,
      confirmPassword: this.changePasswordForm.get('confirmNewPassword').value,
      gender:this.storageService.getGender(),
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
        email: [this.storageService.getEmail(), [Validators.required, Validators.email]],
        newPassword: [
          this.storageService.getPassword(),
          [Validators.required, Validators.minLength(6)],
        ],
        confirmNewPassword: [this.storageService.getConfirmPassword(), Validators.required],
        study: [''],
        wentTo: [''],
        livesIn: [''],
        from: [''],
      },
      { validator: [Custome.changePassword] }
    );
  }
}
