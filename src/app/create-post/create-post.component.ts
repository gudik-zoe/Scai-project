import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { catchError } from 'rxjs/operators';
import { MyInterceptor } from '../my-interceptor';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor(
    private postsService: PostsService,
    private accountService: AccountService,
    private route: Router,
    private http: HttpClient,
    private inter: MyInterceptor
  ) {}

  foto: Blob;
  alertComponent: boolean = false;
  inputData: string = '';
  userData: Account;
  myImage;
  postImage;
  errorPhrase: string = '';
  close() {
    this.alertComponent = false;
    this.userData = null;
    this.postImage = null;
    this.inputData = undefined;
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
          this.errorPhrase = '';
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event) => {
            this.postImage = event.target.result;
          };
        },
        (error) => {
          this.errorPhrase = error.error.message;
        }
      );
    }
  }

  sharePost(text: string) {
    if (!text.trim()) {
      this.errorPhrase = 'cannot enter an empty text';
    } else {
      const post = {
        text: text,
        image: this.myImage?.name || 'null',
        description: null,
        postOriginalId: null,
        date: new Date().getTime(),
      };
      this.postsService.addPost(post).subscribe(
        (data: Post) => {
          this.errorPhrase = '';
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
        },
        (error) => (this.errorPhrase = error.error.message)
      );
    }
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
