import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { Post } from '../models/post';
import { PostOption } from '../models/postOption';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export class SharePostComponent implements OnInit {
  constructor() {}

  @Input() postToShare: Post;
  @Input() userData: AccountBasicData;
  @Output() confirmSharePost = new EventEmitter<any>();
  inputData: string;
  errorPhrase: string = '';
  isPublic: boolean = true;

  postOption: PostOption = { status: 'public', icon: 'fa fa-globe' };

  postOptions: PostOption[] = [
    { status: 'public', icon: 'fa fa-globe' },
    { status: 'just-friends', icon: 'fa fa-users' },
    { status: 'only-me', icon: 'fa fa-lock' },
  ];

  private(postOption: PostOption) {
    this.postOption = postOption;
  }

  confirmShare(post: Post, extraText: string) {
    const text = extraText.trim();
    if (!text || text == undefined) {
      this.errorPhrase = 'add ur own text';
    } else {
      const formData = new FormData();
      formData.append('extraText', text);
      formData.append('postOption', this.postOption.status);
      this.confirmSharePost.emit({
        post: this.postToShare,
        formData: formData,
      });
    }
  }

  ngOnInit() {}
}
