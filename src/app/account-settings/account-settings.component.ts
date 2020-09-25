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

  newUser;
  newCover;
  myImage;
  userData;
  name;
  lastName;
  password;

  image() {
    return this.userData?.profilePhoto;
  }

  goToHome() {
    this.route.navigate(['/user-profile']);
  }

  newImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myImage = file;
      const formData = new FormData();
      formData.append('file', this.myImage);
      this.http
        .post('http://localhost:8080/upload', formData)
        .subscribe((data) => {
          console.log(data);
        });
      this.http
        .put(
          'http://localhost:8080/api/accounts/' +
            this.accountService.getId() +
            '/' +
            this.myImage.name,
          {}
        )
        .subscribe((data) => {
          console.log(data);
        });
    }

    // if (event.target.files) {
    //   let reader = new FileReader();
    //   reader.readAsDataURL(event.target.files[0]);
    //   reader.onload = (event) => {
    //     this.myImage = event.target.result;

    //   };
    // }
  }
  changeCoverPhoto(event) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.newCover = event.target.result;
      };
    }
  }
  coverPhoto = this.storageService.getCoverPhoto();
  getImage() {
    if (this.image) {
      return this.image;
    } else {
      return this.storageService.getImage();
    }
  }

  getCover() {
    if (this.newCover) {
      return this.newCover;
    } else {
      return this.storageService.getCoverPhoto();
    }
  }
  getFirstName() {
    return this.userData.firstName;
  }

  getLastName() {
    return this.userData.lastName;
  }
  confirm() {
    this.changeEssentialData.value.profilePhoto = this.myImage;

    // console.log(this.changeEssentialData.value);
    this.accountService
      .updateAccount(this.changeEssentialData.value)
      .subscribe((data) => {
        console.log(data);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = this._sanitizer.bypassSecurityTrustResourceUrl(
          reader.result.toString()
        );
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  imageToShow;

  ngOnInit() {
    this.changeEssentialData = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmNewPassword: ['', Validators.required],
        study: [''],
        wentTo: [''],
        livesIn: [''],
        from: [''],
        image: [''],
      },
      { validator: [Custome.changePassword] }
    );
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
      this.http
        .get('http://localhost:8080/files/' + this.userData.profilePhoto, {
          responseType: 'blob',
        })
        .subscribe((data) => {
          this.createImageFromBlob(data);
          console.log(this.userData.profilePhoto);
        });
    });
  }
}
