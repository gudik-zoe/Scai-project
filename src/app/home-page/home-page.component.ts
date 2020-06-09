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
  constructor(private service: PostsService, private route: Router) {}
  likeBtn = false;

  logOut() {
    localStorage.removeItem('key');
    this.route.navigate(['/auth']);
  }
  like(id) {
    if (this.likeBtn == false) {
      this.service.like(id);
      this.likeBtn = true;
    } else {
      this.service.disLike(id);
      this.likeBtn = false;
    }
  }

  showComments(id) {
    this.service.showComment(id);
  }

  comment(id, data) {
    this.service.comment(id, data);
  }

  ngOnInit() {
    this.posts = this.service.posts;
  }
}
