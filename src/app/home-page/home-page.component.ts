import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../log-in/auth.service';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  posts = [];
  data;
  constructor(private postService: PostsService,
     private route: Router ,
      private auth:AuthService ,
       private storageService: StorageService) {}
  likeBtn = false;
  input
  commentInput

  getUserName() {
    return this.storageService.getName()
  }
  goToDescription(id) {
    this.route.navigate(['/description', id]);
  }
  post(data){
    this.postService.post(data)
    this.input = undefined
  }
  
  like(id) {
   this.postService.like(id)
  }

  userFriends = []

  showComments(id) {
    this.postService.showComment(id);
  }

  comment(id, data) {
    this.postService.comment(id, data.value);
    data.value = ''
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
