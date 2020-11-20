import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css'],
})
export class DeletePostComponent implements OnInit, OnDestroy {
  constructor(private postService: PostsService) {}
  openComponent: boolean;
  postId: number;

  getSubject() {
    this.subscribtion = this.postService.deletePostSubject.subscribe((data) => {
      this.openComponent = data.openComponent;
      this.postId = data.postId;
    });
  }
  cancel() {
    this.openComponent = false;
  }

  delete() {
    this.postService.confirmPostDeleting.next({
      delete: true,
      postId: this.postId,
    });
    this.openComponent = false;
  }
  public subscribtion: Subscription;
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  ngOnInit() {
    this.getSubject();
  }
}
