import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css'],
})
export class DeletePostComponent implements OnInit {
  constructor(private postService: PostsService) {}
  openComponent: boolean;
  postId: number;

  getSubject() {
    this.postService.deletePostSubject.subscribe((data) => {
      console.log(data);
      this.openComponent = data.openComponent;
      this.postId = data.postId;
    });
  }
  ngOnInit() {
    this.getSubject();
  }
}
