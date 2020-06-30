import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../log-in/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit {
  users = this.auth.localStorageArray;
  currentUser = JSON.parse(localStorage.getItem('key'));
  constructor(
    private postService: PostsService,
    private route: Router,
    private auth: AuthService
  ) {}

  goToFriends() {
    this.route.navigate(['/add-friends']);
  }
  ngOnInit() {}
}
