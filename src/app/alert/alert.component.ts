import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private accountService: AccountService,
    private route: Router,
    private http: HttpClient
  ) {}
  ngOnDestroy() {}
  foto: Blob;
  alertComponent: boolean = false;
  inputData: string;
  userData: Account;
  userImage: Blob;
  myImage;
  postImage;

  close() {
    this.alertComponent = false;
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
    this.postsService.addPost(post).subscribe((data: Post) => {
      this.alertComponent = false;
      (data.postLikes = []), (data.comments = []);
      data.doneBy = {
        idAccount: this.userData.idAccount,
        profilePhoto: this.userData.profilePhoto,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
      };
      this.postsService.dbPosts.push(data);
      this.userData = null;
      this.postImage = null;
      this.inputData = null;
    });
  }

  getComponentData() {
    this.postsService.alertComponent.subscribe((data) => {
      (this.userData = data.userData),
        (this.alertComponent = data.openComponent);
    });
  }
  ngOnInit() {
    this.getComponentData();
  }
}
