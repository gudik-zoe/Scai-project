import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Account } from '../models/account';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leave-post',
  templateUrl: './leave-post.component.html',
  styleUrls: ['./leave-post.component.css'],
})
export class LeavePostComponent implements OnInit {
  myImage;
  errorPhrase: string;
  image;
  leavePostComponent: boolean;
  inputData: string;
  userData: Account;
  requestedUserData: Account;
  imgUrl: string = environment.rootUrl + 'files/';
  rootUrl: string = environment.rootUrl;
  constructor(private http: HttpClient, private postSerice: PostsService) {}

  uploadImage(event): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myImage = file;
      const formData = new FormData();
      formData.append('file', this.myImage);
      this.http.post(this.rootUrl + 'upload', formData).subscribe(
        (data) => {
          this.errorPhrase = '';
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          reader.onload = (event) => {
            this.image = event.target.result;
          };
        },
        (error) => {
          this.errorPhrase = error.error.message;
        }
      );
    }
  }

  post() {
    if (!this.inputData.trim() || !this.inputData) {
      this.errorPhrase = 'you cannot add a post without a text';
    } else {
      const post = {
        text: this.inputData,
        image: this.myImage?.name || 'null',
        postedOn: this.requestedUserData.idAccount,
      };
      this.postSerice.addPost(post).subscribe(
        (data: Post) => {
          console.log(data);
          this.errorPhrase = '';
          (data.postLikes = []), (data.comments = []);
          data.doneBy = {
            idAccount: this.userData.idAccount,
            profilePhoto: this.userData.profilePhoto,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
          };
          data.postedOnData = {
            idAccount: this.requestedUserData.idAccount,
            profilePhoto: this.requestedUserData.profilePhoto,
            firstName: this.requestedUserData.firstName,
            lastName: this.requestedUserData.lastName,
          };
          this.postSerice.accountPosts.push(data);
          this.leavePostComponent = false;
        },
        (error) => (this.errorPhrase = error.error.message)
      );
    }
  }
  close() {
    this.leavePostComponent = false;
  }
  getComponentData() {
    this.postSerice.leavePostComponent.subscribe((data) => {
      this.leavePostComponent = data.leavePostComponent;
      (this.userData = data.userData),
        (this.requestedUserData = data.requestedUserData);
    });
  }
  ngOnInit() {
    this.getComponentData();
  }
}