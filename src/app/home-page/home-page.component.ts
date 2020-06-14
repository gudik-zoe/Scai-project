import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  posts = [];
  data;
  constructor(private postService: PostsService, private route: Router) {}
  likeBtn = false;
  input

  getUserName() {
    return JSON.parse(localStorage.getItem('key')).name;
  }
  goToDescription(id) {
    this.route.navigate(['/description', id]);
  }
  post(data){
    this.postService.post(data)
  }
  
  like(id) {
   this.postService.like(id)
  }

  userFriends = []

  showComments(id) {
    this.postService.showComment(id);
  }

  comment(id, data) {
    this.postService.comment(id, data);
  }
  share(id) {
    this.postService.share(id);
  }
  addFriends(){
    this.route.navigate(['/add-friends'])
  }

  ngOnInit() {
    this.posts = this.postService.posts;
    this.userFriends = this.postService.userFriends
  }
}
