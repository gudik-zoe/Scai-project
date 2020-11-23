import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class SharePostComponent implements OnInit, OnDestroy {
  constructor(private postService: PostsService) {}

  userData: AccountBasicData;
  sharePostComponent: boolean;
  post: Post;
  inputData: string;
  postDoneBy: AccountBasicData;
  errorPhrase: string = '';
  imgUrl: string = environment.rootUrl + 'files/';

  public subscribtion: Subscription;
  getRequestedData() {
    this.subscribtion = this.postService.sharePostComponent.subscribe(
      (data) => {
        (this.userData = data.userData),
          (this.post = data.post),
          (this.sharePostComponent = data.openComponent);
        this.postDoneBy = data.doneBy;
      }
    );
  }

  closeSharePostComponent() {
    this.sharePostComponent = false;
  }

  confirmShare(post: Post, extraText: string) {
    const text = extraText.trim();
    if (!text || text == undefined) {
      this.errorPhrase = 'add ur own text';
    } else {
      this.postService
        .resharePost(post.idPost, text)
        .subscribe((data: Post) => {
          console.log(data);
          // post.doneBy && post.postOriginalId && post.originalPostDoneBy
          (data.postLikes = []), (data.comments = []);
          data.doneBy = {
            idAccount: this.userData.idAccount,
            profilePhoto: this.userData.profilePhoto,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
          };
          data.image = post.image;
          data.text = post.text;
          data.originalPostDoneBy = {
            firstName: post.doneBy.firstName,
            lastName: post.doneBy.lastName,
            idAccount: post.postCreatorId,
            profilePhoto: post.doneBy.profilePhoto,
          };
          this.postService.homePagePosts.unshift(data);
          this.inputData = undefined;
          this.sharePostComponent = false;
        });
    }
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  ngOnInit() {
    this.getRequestedData();
  }
}
