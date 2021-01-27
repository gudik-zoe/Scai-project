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

  // getRequestedData() {
  //   this.subscribtion = this.postService.sharePostComponent.subscribe(
  //     (data) => {
  //       (this.userData = data.userData),
  //         (this.post = data.post),
  //         (this.sharePostComponent = data.openComponent);
  //       // this.postDoneBy = data.doneBy;
  //     }
  //   );
  // }

  private(postOption: PostOption) {
    this.postOption = postOption;
  }

  closeSharePostComponent() {
    this.confirmSharePost.emit(undefined);
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
      // this.postService.resharePost(post.idPost, formData).subscribe(
      //   (data: Post) => {
      //     // post.doneBy && post.postOriginalId && post.originalPostDoneBy
      //     (data.postLikes = []), (data.comments = []);
      //     data.doneBy = {
      //       idAccount: this.userData.idAccount,
      //       profilePhoto: this.userData.profilePhoto,
      //       firstName: this.userData.firstName,
      //       lastName: this.userData.lastName,
      //     };
      //     data.image = post.image;
      //     data.text = post.text;
      //     if (this.postToShare.doneBy) {
      //       data.originalPostDoneBy = { ...this.postToShare.doneBy };
      //     } else {
      //       data.originalPostDoneByPage = { ...this.postToShare.doneByPage };
      //     }
      //     if (this.postOption.status != 'only-me') {
      //       this.postService.confirmCreatePost.next(data);
      //     }
      //     this.inputData = undefined;
      //     this.sharePostComponent = false;
      //   },
      //   (error) => {
      //     this.errorPhrase = error.error.message;
      //   }
      // );
    }
  }
  // ngOnDestroy() {
  //   this.subscribtion.unsubscribe();
  // }
  ngOnInit() {}
}
