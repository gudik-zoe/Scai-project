import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css'],
})
export class DeletePostComponent implements OnInit {
  constructor(private postService: PostsService) {}

  @Input() postId: number;
  @Output() confirmDeletPost = new EventEmitter<number>();

  cancel() {
    this.confirmDeletPost.emit(undefined);
  }

  delete() {
    this.confirmDeletPost.emit(this.postId);
  }

  ngOnInit() {}
}
