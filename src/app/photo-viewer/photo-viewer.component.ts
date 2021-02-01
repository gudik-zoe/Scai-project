import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor(@Inject(MAT_DIALOG_DATA) public image: string) {}

  close() {
    this.image = undefined;
  }

  ngOnInit() {}
}
