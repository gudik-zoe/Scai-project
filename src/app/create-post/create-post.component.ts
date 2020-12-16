import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { Account } from '../models/account';
import { PostsService } from '../services/posts.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { PostOption } from '../models/postOption';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  constructor(private postsService: PostsService) {}

  rootUrl: string = environment.rootUrl;
  alertComponent: boolean = false;
  inputData: string = '';
  userData: Account;
  postTemporaryImage;
  errorPhrase: string = '';
  formData = new FormData();
  hideButton: boolean = false;
  postOption: PostOption = { status: 'public', icon: 'fa fa-globe' };

  postOptions: PostOption[] = [
    { status: 'public', icon: 'fa fa-globe' },
    { status: 'just-friends', icon: 'fa fa-users' },
    { status: 'only-me', icon: 'fa fa-lock' },
  ];

  private(postOption: PostOption) {
    this.postOption = postOption;
  }

  close() {
    this.userData = undefined;
    this.postTemporaryImage = undefined;
    this.inputData = undefined;
    this.formData = new FormData();
    this.errorPhrase = '';
    this.alertComponent = false;
  }

  uploadImage(event) {
    if (
      event.target.files.length > 0 &&
      event.target.files[0].type.includes('image')
    ) {
      const image = event.target.files[0];
      this.formData.append('image', image);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.postTemporaryImage = event.target.result;
      };
    } else {
      this.errorPhrase = ' file type is not supported';
    }
  }

  sharePost(text: string) {
    this.hideButton = true;
    if (!text.trim()) {
      this.errorPhrase = 'cannot enter an empty text';
      this.hideButton = false;
    } else {
      this.formData.append('text', text);
      this.formData.append('postOption', this.postOption.status.toString());
      this.hideButton = true;
      this.postsService.addPost(this.formData).subscribe(
        (data: Post) => {
          this.hideButton = false;
          this.errorPhrase = '';
          this.alertComponent = false;
          (data.postLikes = []), (data.comments = []);
          data.doneBy = {
            idAccount: this.userData.idAccount,
            profilePhoto: this.userData.profilePhoto,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
          };
          if (this.postOption.status != 'only-me') {
            this.postsService.confirmCreatePost.next(data);
          }
          this.userData = undefined;
          this.postTemporaryImage = undefined;
          this.inputData = undefined;
          this.formData = new FormData();
        },
        (error) => {
          this.errorPhrase = error.error.message;
          this.hideButton = false;
          this.formData = new FormData();
        }
      );
    }
  }

  public subscribtion: Subscription;
  getComponentData() {
    this.subscribtion = this.postsService.alertComponent.subscribe((data) => {
      (this.userData = data.userData),
        (this.alertComponent = data.openComponent);
    });
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  ngOnInit() {
    this.getComponentData();
  }
}
