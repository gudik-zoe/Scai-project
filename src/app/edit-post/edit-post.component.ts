import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../models/account';
import { editPost } from '../models/editPostInt';
import { PostsModel } from '../models/posts';
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
  post: PostsModel;
  userData: AccountModel;
  inputData: string;
  showImage: boolean = true;
  myImage;
  postImage: string | ArrayBuffer;

  openEditPostComponent() {
    this.postService.editPostComponent.subscribe((data: editPost) => {
      (this.editPostComponent = data.edit),
        (this.post = data.post),
        (this.userData = data.userData);
      this.inputData = data.post.text;
      // console.log(this.editPostComponent, this.post, this.userData);
    });
  }

  closeEditPostComponent() {
    this.editPostComponent = false;
    this.showImage = true;
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
      this.post.image = this.myImage;
    } else {
      this.post.image = null;
    }
    this.post.text = this.inputData;
    console.log(this.post);
    this.postService.updatePost(this.post).subscribe((data) => {
      console.log(data);
      this.editPostComponent = false;
    });
  }

  ngOnInit() {
    this.openEditPostComponent();
  }
}
