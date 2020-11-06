import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment';

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
  userData: Account;
  emailExistError: boolean = false;
  rootUrl: string = environment.rootUrl;
  uploadImageError: boolean = false;
  errorPhrase: string;

  goToHome() {
    this.route.navigate(['/user-profile']);
  }

  newImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.http.post(this.rootUrl + 'upload', formData).subscribe(
        (data) => {
          this.uploadImageError = false;
          this.http
            .put(
              this.rootUrl + 'api/accounts/profilePhoto/accountId/' + file.name,
              {}
            )
            .subscribe(() => {
              this.getUserData();
              this.accountService.imageSubject.next(true);
            });
        },
        (error) => {
          this.uploadImageError = true;
          this.errorPhrase = error.error.message;
        }
      );
    }
  }
  changeCoverPhoto(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      const formData = new FormData();
      formData.append('file', file);
      this.http.post(this.rootUrl + 'upload', formData).subscribe(
        (data) => {
          this.errorPhrase = '';
          this.http
            .put(
              this.rootUrl + 'api/accounts/coverPhoto/accountId/' + file.name,
              {}
            )
            .subscribe(() => {
              this.getUserData();
            });
        },
        (error) => {
          this.errorPhrase = error.error.message;
        }
      );
    }
  }

  confirm() {
    this.accountService.updateAccount(this.changeEssentialData.value).subscribe(
      (data) => {
        this.errorPhrase = '';
        this.changeEssentialData.reset();
        this.accountService.getTheLoggedInUserData();
      },
      (error) => (this.errorPhrase = error.error.message)
    );
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
    this.fillFormValues();
  }

  fillFormValues() {
    this.changeEssentialData = this.fb.group(
      {
        firstName: [this.userData.firstName, Validators.required],
        lastName: [this.userData.lastName, Validators.required],
        // email: [this.userData.email, [Validators.required, Validators.email]],
        // password: ['', [Validators.required, Validators.minLength(6)]],
        // confirmNewPassword: ['', Validators.required],
        study: [this.userData.study],
        wentTo: [this.userData.wentTo],
        livesIn: [this.userData.livesIn],
        profilePhoto: [this.userData.profilePhoto],
        coverPhoto: [this.userData.coverPhoto],
      }
      // { validator: [Custome.changePassword] }
    );
  }
  ngOnInit() {
    this.getUserData();
  }
}
