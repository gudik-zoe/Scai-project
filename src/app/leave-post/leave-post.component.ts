import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Account } from '../models/account';
import { Post } from '../models/post';
import { environment } from 'src/environments/environment';
import { AccountService } from '../services/account.service';
import { ImgUrl } from '../models/imgUrl';
import { AccountBasicData } from '../models/accountBasicData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leave-post',
  templateUrl: './leave-post.component.html',
  styleUrls: ['./leave-post.component.css'],
})
export class LeavePostComponent implements OnInit, OnDestroy {
  errorPhrase: string;
  postTemporaryImage; // client image view
  leavePostComponent: boolean;
  inputData: string;
  userData: AccountBasicData;
  requestedUserData: Account;
  rootUrl: string = environment.rootUrl;
  hideButton: boolean = false;
  formData = new FormData();
  constructor(
    private http: HttpClient,
    private postSerice: PostsService,
    private accountService: AccountService
  ) {}

  async uploadImage(event) {
    if (event.target.files.length > 0) {
      const image = event.target.files[0];
      this.formData.append('image', image);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.postTemporaryImage = event.target.result;
      };
    }
  }

  post(text: string) {
    this.hideButton = true;
    if (!text.trim()) {
      this.hideButton = false;
      this.errorPhrase = 'you cannot add a post without a text';
    } else {
      this.formData.append('text', text);
      this.postSerice
        .postOnWall(this.requestedUserData.idAccount, this.formData)
        .subscribe(
          (data: Post) => {
            this.hideButton = false;
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
            this.postSerice.accountPosts.unshift(data);
            this.inputData = undefined;
            this.postTemporaryImage = undefined;
            this.formData = new FormData();
            this.userData = undefined;
            this.leavePostComponent = false;
          },
          (error) => {
            this.errorPhrase = error.error.message;
            this.hideButton = false;
          }
        );
    }
  }
  close() {
    this.inputData = undefined;
    this.postTemporaryImage = undefined;
    this.errorPhrase = '';
    this.formData = new FormData();
    this.leavePostComponent = false;
  }
  public subscribtion: Subscription;
  getComponentData() {
    this.subscribtion = this.postSerice.leavePostComponent.subscribe((data) => {
      this.leavePostComponent = data.leavePostComponent;
      (this.userData = data.userData),
        (this.requestedUserData = data.requestedUserData);
    });
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
  ngOnInit() {
    this.getComponentData();
  }
}
