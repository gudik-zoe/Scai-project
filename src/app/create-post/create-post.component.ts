import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { catchError } from 'rxjs/operators';
import { MyInterceptor } from '../my-interceptor';
import { environment } from 'src/environments/environment';
import { ImgUrl } from '../models/imgUrl';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private accountService: AccountService,
    private route: Router,
    private http: HttpClient,
    private inter: MyInterceptor
  ) {}

  rootUrl: string = environment.rootUrl;
  alertComponent: boolean = false;
  inputData: string = '';
  userData: Account;
  postTemporaryImage;
  errorPhrase: string = '';
  formData = new FormData();
  hideButton: boolean = false;
  close() {
    this.userData = undefined;
    this.postTemporaryImage = undefined;
    this.inputData = undefined;
    this.formData = new FormData();
    this.errorPhrase = '';
    this.alertComponent = false;
  }

  uploadImage(event) {
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

  sharePost(text: string) {
    this.hideButton = true;
    if (!text.trim()) {
      this.errorPhrase = 'cannot enter an empty text';
      this.hideButton = false;
    } else {
      this.formData.append('text', text);
      this.hideButton = true;
      this.postsService.addPost(this.formData).subscribe(
        (data: Post) => {
          this.hideButton = false;
          this.errorPhrase = '';
          this.alertComponent = false;
          (data.postLikes = []), (data.comments = []);
          data.doneBy = {
            idAccount: this.userData.idAccount,
            profilePhoto: this.userData.profilePhoto,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
          };
          this.postsService.homePagePosts.unshift(data);
          this.userData = undefined;
          this.postTemporaryImage = undefined;
          this.inputData = undefined;
          this.formData = new FormData();
        },
        (error) => {
          this.errorPhrase = error.error.message;
          this.hideButton = false;
          this.formData = new FormData();
        }
      );
    }
  }

  public subscribtion: Subscription;
  getComponentData() {
    this.subscribtion = this.postsService.alertComponent.subscribe((data) => {
      (this.userData = data.userData),
        (this.alertComponent = data.openComponent);
    });
  }
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

  ngOnInit() {
    this.getComponentData();
  }
}
