import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { AuthService } from '../log-in/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css'],
})
export class AccountSettingsComponent implements OnInit {
  changeEssentialData: FormGroup;
  changePersonalData: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private storageService: StorageService,
    private auth: AuthService
  ) {}

  newUser;
  newCover;
  image;

  foto() {
    return this.storageService.getImage();
  }

  goToHome() {
    this.route.navigate(['/user-profile']);
  }

  getLastName() {
    return this.storageService.getLastName();
  }
  getName() {
    return this.storageService.getName();
  }
  newImage(event) {
    if (event.target.files) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.image = event.target.result;
      };
    }
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

  confirm() {
    this.storageService.message.next(true);
    const {
      name,
      lastName,
      email,
      newPassword: password,
      confirmNewPassword,
    } = this.changeEssentialData.value;
    const { study, wentTo, livesIn, from } = this.changePersonalData.value;
    this.newUser = {
      image: this.getImage(),
      name,
      lastName,
      email,
      password,
      confirmPassword: password,
      gender: this.storageService.getGender(),
      study,
      wentTo,
      livesIn,
      from,
      coverPhoto: this.getCover(),
      friends: this.storageService.getFriends(),
      posts: this.storageService.getUserPosts(),
      messages: this.storageService.getMessages(),
    };

    this.auth.localStorageArray[
      JSON.parse(localStorage.getItem('key'))
    ] = this.newUser;

    localStorage.setItem('user', JSON.stringify(this.auth.localStorageArray));
    this.route.navigate(['/home-page']);
    setTimeout(() => {
      this.storageService.message.next(false);
    }, 4000);
  }

  ngOnInit() {
    this.changeEssentialData = this.fb.group(
      {
        name: [this.storageService.getName(), Validators.required],
        lastName: [this.storageService.getLastName(), Validators.required],
        email: [
          this.storageService.getEmail(),
          [Validators.required, Validators.email],
        ],
        newPassword: [
          this.storageService.getPassword(),
          [Validators.required, Validators.minLength(6)],
        ],
        confirmNewPassword: [
          this.storageService.getConfirmPassword(),
          Validators.required,
        ],
      },
      { validator: [Custome.changePassword] }
    );

    this.changePersonalData = this.fb.group({
      study: [this.storageService.getStudy()],
      wentTo: [this.storageService.getWentTo()],
      livesIn: [this.storageService.getLivesIn()],
      from: [this.storageService.getFrom()],
      image: [this.storageService.getImage()],
    });
  }
}
