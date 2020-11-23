import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account';
import { environment } from 'src/environments/environment';
import { ImgUrl } from '../models/imgUrl';

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
  changeEssentialDataChanged: boolean = false;
  imgUrl: string = environment.rootUrl + 'files/';
  image: string;
  goToHome() {
    this.route.navigate(['/user-profile']);
  }

  async newImage(event) {
    this.accountService.updateProfilePhoto(event).subscribe(
      (data: ImgUrl) => {
        this.userData.profilePhoto = data.imageUrl;
        this.accountService.imageSubject.next(data.imageUrl);
      },
      (error) => {
        this.errorPhrase = error.error.message;
      }
    );
  }

  async changeCoverPhoto(event) {
    this.accountService.updateCoverPhoto(event).subscribe(
      (data: ImgUrl) => {
        this.userData.coverPhoto = data.imageUrl;
      },
      (error) => {
        this.errorPhrase = error.error.message;
      }
    );
  }

  confirm() {
    this.accountService.updateAccount(this.changeEssentialData.value).subscribe(
      (data) => {
        this.changeEssentialDataChanged = true;
        setTimeout(async () => {
          this.userData = undefined;
          this.accountService.userData = undefined;
          this.userData = await this.accountService.getAccountById(
            this.accountService.getId()
          );
          this.errorPhrase = '';
          this.changeEssentialData.reset();
          this.changeEssentialDataChanged = false;
          this.fillFormValues();
        }, 2000);
      },
      (error) => (this.errorPhrase = error.error.message)
    );
  }

  async getUserData() {
    this.userData = await this.accountService.getAccountById(
      this.accountService.getId()
    );
    this.fillFormValues();
  }

  fillFormValues() {
    this.changeEssentialData = this.fb.group(
      {
        firstName: [this.userData.firstName, Validators.required],
        lastName: [this.userData.lastName, Validators.required],
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
