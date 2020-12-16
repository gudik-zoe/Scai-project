import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.css'],
})
export class PhotoViewerComponent implements OnInit {
  subscription: Subscription;
  openComponent: boolean;
  constructor(private postService: PostsService) {}

  @Input() image: string;

  close() {
    this.image = null;
  }

  ngOnInit() {}
}
