import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private accountService: AccountService,

    private http: HttpClient
  ) {}
  foto: Blob;
  inputData: string;
  userData;
  userImage: Blob;
  myImage;
  postImage;

  close() {
    this.postsService.close.next(false);
  }

  uploadImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myImage = file;
      const formData = new FormData();
      formData.append('file', this.myImage);
      this.http
        .post('http://localhost:8080/upload', formData)
        .subscribe((data) => {
          console.log(data);
        });
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.postImage = event.target.result;
      };
    }
  }

  post(text: string) {
    const post = {
      text: text,
      image: this.myImage?.name,
      description: null,
      postOriginalId: null,
    };
    this.postsService.addPost(post).subscribe((data) => {
      this.postsService.close.next(false);
    });
  }

  getUserData() {
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
    });
  }
  ngOnInit() {
    this.getUserData();
  }
}
