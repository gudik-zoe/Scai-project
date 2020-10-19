import { Component, OnInit } from '@angular/core';
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

  confirmShare() {
    const notification = {
      notCreator: this.userData.idAccount,
      action: 'shared',
      notReceiver: this.post.postCreatorId,
      relatedPostId: this.post.idPost,
      date: new Date().getTime(),
      seen: false,
    };
    const post = {
      extraText: this.inputData,
      postOriginalId: this.post.idPost,
    };
    this.postService.addPost(post).subscribe((data) => {
      this.notificationService
        .addNotification(notification)
        .subscribe((data) => {
          console.log(data);
        });
      this.sharePostComponent = false;
    });
  }
  ngOnInit() {
    this.getRequestedData();
  }
}
