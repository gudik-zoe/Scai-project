import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Account } from '../models/account';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { ImgUrl } from '../models/imgUrl';

@Component({
  selector: 'app-leave-post',
  templateUrl: './leave-post.component.html',
  styleUrls: ['./leave-post.component.css'],
})
export class LeavePostComponent implements OnInit {
  myImage: string; //image to push to server
  errorPhrase: string;
  image; // client image view
  leavePostComponent: boolean;
  inputData: string;
  userData: Account;
  requestedUserData: Account;
  rootUrl: string = environment.rootUrl;
  constructor(
    private http: HttpClient,
    private postSerice: PostsService,
    private accountService: AccountService
  ) {}

  async uploadImage(event) {
    this.http
      .post(
        this.rootUrl + 'addImage',
        await this.accountService.uploadAnImage(event)
      )
      .subscribe(
        (data: ImgUrl) => {
          this.myImage = data.imageUrl;
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

  // post() {
  //   if (!this.inputData.trim() || !this.inputData) {
  //     this.errorPhrase = 'you cannot add a post without a text';
  //   } else {
  //     const post = {
  //       text: this.inputData,
  //       image: this.myImage || 'null',
  //       postedOn: this.requestedUserData.idAccount,
  //       date: new Date().getTime(),
  //     };
  //     this.postSerice.addPost(post).subscribe(
  //       (data: Post) => {
  //         this.errorPhrase = '';
  //         (data.postLikes = []), (data.comments = []);
  //         data.doneBy = {
  //           idAccount: this.userData.idAccount,
  //           profilePhoto: this.userData.profilePhoto,
  //           firstName: this.userData.firstName,
  //           lastName: this.userData.lastName,
  //         };
  //         data.postedOnData = {
  //           idAccount: this.requestedUserData.idAccount,
  //           profilePhoto: this.requestedUserData.profilePhoto,
  //           firstName: this.requestedUserData.firstName,
  //           lastName: this.requestedUserData.lastName,
  //         };
  //         this.postSerice.accountPosts.push(data);
  //         this.leavePostComponent = false;
  //       },
  //       (error) => (this.errorPhrase = error.error.message)
  //     );
  //   }
  // }
  close() {
    this.leavePostComponent = false;
    this.errorPhrase = '';
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
