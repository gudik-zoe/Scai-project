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

  async getUserData() {
    this.userData = await this.accountService.getUserData();
  }

  public closeEditPostComponent(): void {
    this.editPostComponent = false;
  }

  deleteImage() {
    this.showImage = false;
  }

  uploadImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myImage = file;
      const formData = new FormData();
      formData.append('file', this.myImage);
      console.log(typeof this.myImage);
      this.http
        .post('http://localhost:8080/upload', formData)
        .subscribe((data) => {
          console.log(data);
        });
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.postImage = event.target.result;
        console.log(typeof this.postImage);
      };
    }
  }

  confirmEdit() {
    if (this.myImage) {
      this.post.image = this.myImage.name;
    } else {
      this.post.image = null;
    }
    this.post.text = this.inputData;
    this.postService.updatePost(this.post).subscribe((data) => {
      console.log(data);
      this.editPostComponent = false;
    });
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
