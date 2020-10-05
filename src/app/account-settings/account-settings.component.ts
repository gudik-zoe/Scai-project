import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class AccountSettingsComponent implements OnInit {
  changeEssentialData: FormGroup;

  // changePersonalData: FormGroup;
  constructor(
    private http: HttpClient,
    private _sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private route: Router,
    private storageService: StorageService,
    private auth: AuthService,
    private accountService: AccountService
  ) {}
  coverPhoto;
  profilePhoto;
  userData;
  imageToShow;

  image() {
    return this.userData?.profilePhoto;
  }

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
          console.log(data);
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
    this.changeEssentialData.value.profilePhoto = this.userData.profilePhoto;
    console.log(this.changeEssentialData.value);
    this.accountService
      .updateAccount(this.changeEssentialData.value)
      .subscribe((data) => {
        this.changeEssentialData.reset();
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
        from: [this.userData.from],
      },
      { validator: [Custome.changePassword] }
    );
  }
  ngOnInit() {
    this.getUserData();
  }
}

// createImageFromBlob(image: Blob) {
//   let reader = new FileReader();
//   reader.addEventListener(
//     'load',
//     () => {
//       this.imageToShow = this._sanitizer.bypassSecurityTrustResourceUrl(
//         reader.result.toString()
//       );
//     },
//     false
//   );

//   if (image) {
//     reader.readAsDataURL(image);
//   }
// }

// if (event.target.files) {
//   let reader = new FileReader();
//   reader.readAsDataURL(event.target.files[0]);
//   reader.onload = (event) => {
//     this.myImage = event.target.result;

//   };
// }
// getImage() {
//   if (this.image) {
//     return this.image;
//   } else {
//     return this.storageService.getImage();
//   }
// }

// getCover() {
//   if (this.newCover) {
//     return this.newCover;
//   } else {
//     return this.storageService.getCoverPhoto();
//   }
// }
