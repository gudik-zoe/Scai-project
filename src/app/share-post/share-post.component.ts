import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { Post } from '../models/post';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-share-post',
  templateUrl: './share-post.component.html',
  styleUrls: ['./share-post.component.css'],
})
export class SharePostComponent implements OnInit {
  constructor(
    private postService: PostsService,
    private notificationService: NotificationService
  ) {}
  userData: Account;
  sharePostComponent: boolean;
  post: Post;
  inputData: string;
  postDoneBy: AccountBasicData;
  errorPhrase: string = '';
  imgUrl: string = environment.rootUrl + 'files/';

  getRequestedData() {
    this.postService.sharePostComponent.subscribe((data) => {
      (this.userData = data.userData),
        (this.post = data.post),
        (this.sharePostComponent = data.openComponent);
      this.postDoneBy = data.doneBy;
    });
  }

  closeSharePostComponent() {
    this.sharePostComponent = false;
  }

  confirmShare(idPost: number, extraText: string) {
    const text = extraText.trim();
    if (!text || text == undefined) {
      this.errorPhrase = 'add ur own text';
    } else {
      this.postService.resharePost(idPost, text).subscribe((data) => {
        this.sharePostComponent = false;
      });
    }
  }
  ngOnInit() {
    this.getRequestedData();
  }
}
