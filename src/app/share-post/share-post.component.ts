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
  isPublic: boolean = true;
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

  private() {
    this.isPublic = !this.isPublic;
  }

  closeSharePostComponent() {
    this.sharePostComponent = false;
  }

  confirmShare(post: Post, extraText: string) {
    const text = extraText.trim();
    if (!text || text == undefined) {
      this.errorPhrase = 'add ur own text';
    } else {
      const formData = new FormData();
      formData.append('extraText', text);
      formData.append('isPublic', this.isPublic.toString());
      this.postService.resharePost(post.idPost, formData).subscribe(
        (data: Post) => {
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
          if (this.isPublic) {
            this.postService.confirmCreatePost.next(data);
          }
          this.inputData = undefined;
          this.sharePostComponent = false;
        },
        (error) => {
          this.errorPhrase = error.error.message;
        }
      );
    }
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  ngOnInit() {
    this.getRequestedData();
  }
}
