import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { AccountBasicData } from '../models/accountBasicData';
import { EditPost } from '../models/editPostInt';
import { ImgUrl } from '../models/imgUrl';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostsService,
    private pageService: PagesService
  ) {}

  editPostComponent: boolean;
  post: Post;
  userData: AccountBasicData;
  inputData: string;
  showImage: boolean = true;
  image: object;
  postImage: string | ArrayBuffer;
  imageChanged: boolean = false;
  errorPhrase: string = '';
  rootUrl: string = environment.rootUrl;
  postWithImage: boolean = true;
  hideButton: boolean = false;
  formData = new FormData();
  // public close() {
  //   this.editPostComponent = false;
  //   this.showImage = true;
  //   this.errorPhrase = '';
  //   this.image = undefined;
  //   this.imageChanged = false;
  //   this.postImage = undefined;
  // }

  close() {
    this.hideButton = false;
    this.image = undefined;
    this.imageChanged = false;
    this.showImage = true;
    this.postWithImage = true;
    this.postImage = undefined;
    this.errorPhrase = '';
    this.editPostComponent = false;
    this.formData = new FormData();
  }

  uploadImage(event) {
    if (
      event.target.files.length > 0 &&
      event.target.files[0].type.includes('image')
    ) {
      const image = event.target.files[0];
      this.formData.append('image', image);
      this.postWithImage = true;
      this.imageChanged = true;
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.postImage = event.target.result;
        this.showImage = false;
        this.errorPhrase = '';
      };
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }

  deleteImage() {
    this.showImage = false;
    this.imageChanged = true;
    this.postWithImage = false;
  }

  editUserPost() {
    this.formData.append('text', this.inputData);
    this.postService
      .updatePost(this.post.idPost, this.formData, this.postWithImage)
      .subscribe(
        (data: Post) => {
          this.post.image = data.image;
          this.post.text = data.text;
          this.close();
        },
        (error) => {
          this.errorPhrase = error.error.message;
          this.hideButton = false;
        }
      );
  }

  editPagePost() {
    this.formData.append('text', this.inputData);
    this.pageService
      .editPost(this.post.idPost, this.formData, this.postWithImage)
      .subscribe(
        (data: Post) => {
          this.post.image = data.image;
          this.post.text = data.text;
          this.close();
        },
        (error) => {
          this.errorPhrase = error.error.message;
          this.hideButton = false;
        }
      );
  }

  confirmEdit() {
    this.hideButton = true;
    if (this.imageChanged && !this.formData.get('image')) {
      this.hideButton = false;
      this.post.image = null;
    }
    if (!this.inputData.trim() && !this.post.image) {
      this.hideButton = false;
      this.errorPhrase = 'cannot add an empty post';
      this.post.text = this.post.text;
      this.post.image = this.post.image;
    } else if (this.post.text == this.inputData.trim() && !this.imageChanged) {
      this.hideButton = false;
      this.errorPhrase = "post wasn't change";
    } else if (!this.inputData.trim()) {
      this.hideButton = false;
      this.errorPhrase = "canno't add an empty text";
    } else {
      if (!this.post.pageCreatorId) {
        this.editUserPost();
      } else {
        this.editPagePost();
      }
    }
  }
  public subscribtion: Subscription;
  getPostData() {
    this.subscribtion = this.postService.editPostComponent.subscribe((data) => {
      this.post = data.post;
      this.userData = data.userData;
      this.editPostComponent = data.openComponent;
      this.inputData = data.post.text;
    });
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  ngOnInit() {
    this.getPostData();
  }
}
