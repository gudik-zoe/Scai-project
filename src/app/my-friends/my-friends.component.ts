import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit {
  myFriends = [];

  constructor(private postService: PostsService, private route: Router) {}

  remove(id) {
    console.log('remove');
  }
  goToFriends() {
    this.route.navigate(['/add-friends']);
  }
  ngOnInit() {}
}
