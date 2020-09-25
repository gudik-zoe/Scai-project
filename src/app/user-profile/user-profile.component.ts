import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { EventsService } from '../services/events.service';
import { PostsService } from '../services/posts.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private service: PostsService,
    private storageService: StorageService,
    private auth: AuthService,
    private eventService: EventsService
  ) {}
  sharedPosts = [];
  userEvents = [];
  userData;
  coverPhoto = 'https://www.w3schools.com/howto/img_avatar.png ';

  // image() {
  //   return this.storageService.getImage();
  // }

  edit(): void {
    this.route.navigate(['/account-settings']);
  }

  toDescription(id: number): void {
    this.route.navigate(['description', id]);
  }

  name() {
    return this.userData.firstName;
  }
  lastName() {
    return this.userData.lastName;
  }
  study() {
    return this.userData.study;
  }
  wentTo() {
    return this.userData.wentTo;
  }

  livesIn() {
    return this.userData.livesIn;
  }
  from() {
    return this.userData.city;
  }

  getPersonalPosts() {
    return this.storageService.getUserPosts();
  }

  getUserName() {
    this.accountService.userData.firstName;
  }
  ngOnInit() {
    // this.backEnd.getData().subscribe((data) => {
    //   this.userData = data;
    // });
    this.sharedPosts = this.service.sharedPosts;
    this.userEvents = this.eventService.userStatus;
  }
}
