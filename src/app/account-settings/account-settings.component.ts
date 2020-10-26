import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  changeEssentialData: FormGroup;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: Router,
    private accountService: AccountService
  ) {}
  coverPhoto;
  profilePhoto;
  userData: Account;
  emailExistError: boolean = false;

  goToHome() {
    this.route.navigate(['/user-profile']);
  }

  newImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profilePhoto = file;
      const formData = new FormData();
      formData.append('file', this.profilePhoto);
      this.http
        .post('http://localhost:8080/upload', formData)
        .subscribe((data) => {
          // console.log(data);
        });
      this.http
        .put(
          'http://localhost:8080/api/accounts/profilePhoto/' +
            this.accountService.getId() +
            '/' +
            this.profilePhoto.name,
          {}
        )
        .subscribe(() => {
          this.getUserData();
          this.accountService.imageSubject.next(true);
        });
    }
  }
  changeCoverPhoto(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.coverPhoto = file;
      const formData = new FormData();
      formData.append('file', this.coverPhoto);
      this.http
        .post('http://localhost:8080/upload', formData)
        .subscribe((data) => {
          console.log(data);
        });
      this.http
        .put(
          'http://localhost:8080/api/accounts/coverPhoto/' +
            this.accountService.getId() +
            '/' +
            this.coverPhoto.name,
          {}
        )
        .subscribe(() => {
          this.getUserData();
        });
    }
  }

  confirm() {
    this.accountService
      .updateAccount(this.changeEssentialData.value)
      .subscribe((data) => {
        console.log(data);
        if (data) {
          this.changeEssentialData.reset();
        } else {
          this.emailExistError = true;
        }
      });
  }

  async getUserData() {
    this.userData = await this.accountService.getUserData();
    this.fillFormValues();
  }

  fillFormValues() {
    this.changeEssentialData = this.fb.group(
      {
        firstName: [this.userData.firstName, Validators.required],
        lastName: [this.userData.lastName, Validators.required],
        email: [this.userData.email, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
        study: [this.userData.study],
        wentTo: [this.userData.wentTo],
        livesIn: [this.userData.livesIn],
        profilePhoto: [this.userData.profilePhoto],
        coverPhoto: [this.userData.coverPhoto],
      },
      { validator: [Custome.changePassword] }
    );
  }
  ngOnInit() {
    this.getUserData();
  }
}
