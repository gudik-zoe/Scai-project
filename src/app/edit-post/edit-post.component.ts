import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account';
import { EditPost } from '../models/editPostInt';
import { ImgUrl } from '../models/imgUrl';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  constructor(
    private postService: PostsService,
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  editPostComponent: boolean;
  post: Post;
  userData: Account;
  inputData: string;
  showImage: boolean = true;
  myImage;
  postImage: string | ArrayBuffer;
  imageChanged: boolean = false;
  errorPhrase: string = '';
  rootUrl: string = environment.rootUrl;
  public closeEditPostComponent(): void {
    this.editPostComponent = false;
    this.showImage = true;
    this.errorPhrase = '';
    this.myImage = undefined;
  }

  async uploadImage(event) {
    this.http
      .post(
        this.rootUrl + 'addImage',
        await this.accountService.uploadAnImage(event)
      )
      .subscribe(
        (data: ImgUrl) => {
          this.myImage = data.imageUrl;
          this.imageChanged = true;
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event) => {
            this.postImage = event.target.result;
            this.showImage = false;
            this.errorPhrase = '';
          };
        },
        (error) => {
          this.errorPhrase = error.error.message;
        }
      );
  }

  deleteImage() {
    this.showImage = false;
    this.imageChanged = true;
  }

  confirmEdit() {
    if (this.imageChanged && this.myImage) {
      this.post.image = this.myImage;
    } else if (this.imageChanged && !this.myImage) {
      this.post.image = null;
    }
    if (this.inputData) {
      this.post.text = this.inputData.trim();
    } else {
      this.post.text = null;
    }
    if (!this.post.text && !this.post.image) {
      this.errorPhrase = 'cannot add an empty post';
      this.post.text = this.post.text;
      this.post.image = this.post.image;
    } else {
      this.postService.updatePost(this.post).subscribe(
        (data) => {
          this.editPostComponent = false;
          this.myImage = undefined;
        },
        (error) => {
          this.errorPhrase = error.error.message;
        }
      );
    }
  }

  getPostData() {
    this.postService.editPostComponent.subscribe((data) => {
      this.post = data.post;
      this.userData = data.userData;
      this.editPostComponent = data.openComponent;
      this.inputData = data.post.text;
    });
  }

  ngOnInit() {
    this.getPostData();
  }
}
