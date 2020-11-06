import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Account } from '../models/account';
import { EditPost } from '../models/editPostInt';
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

  public closeEditPostComponent(): void {
    this.editPostComponent = false;
    this.showImage = true;
    this.errorPhrase = '';
  }

  uploadImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myImage = file;
      const formData = new FormData();
      formData.append('file', this.myImage);
      this.http.post('http://localhost:8080/upload', formData).subscribe(
        (data) => {
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
  }

  deleteImage() {
    this.showImage = false;
    this.imageChanged = true;
  }

  confirmEdit() {
    if (this.imageChanged && this.myImage) {
      this.post.image = this.myImage.name;
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
      this.postService
        .updatePost(this.post.idPost, this.post.text, this.post.image)
        .subscribe(
          (data) => {
            this.editPostComponent = false;
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
