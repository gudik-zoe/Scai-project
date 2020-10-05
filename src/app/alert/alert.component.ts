import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AccountModel } from '../models/account';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private postsService: PostsService,
    private _sanitizer: DomSanitizer,
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

  // newImage(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.myImage = file;
  //     const formData = new FormData();
  //     formData.append('file', this.myImage);
  //     this.http
  //       .post('http://localhost:8080/upload', formData)
  //       .subscribe((data) => {
  //         console.log(data);
  //       });
  //     this.http
  //       .put(
  //         'http://localhost:8080/api/accounts/' +
  //           this.accountService.getId() +
  //           '/' +
  //           this.myImage.name,
  //         {}
  //       )
  //       .subscribe(async () => {
  //         await this.getUserData();
  //         this.accountService.imageSubject.next(this.imageToShow);
  //       });
  //   }
  // }

  createImageFromBlob(image: Blob) {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const image = this._sanitizer.bypassSecurityTrustResourceUrl(
            reader.result.toString()
          );
          resolve(image);
        },
        false
      );

      if (image) {
        reader.readAsDataURL(image);
      }
    });
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

  // async getUserData() {
  //   const { userData, image } = await this.accountService.getUserImageAndData();
  //   this.userData = userData;
  //   this.userImage = image;
  // }

  post(text: string): void {
    this.postsService
      .addPost(text, this.myImage?.name, null)
      .subscribe((data) => {
        // this.postsService.refreshPosts.next(true);
        this.postsService.getPosts()
         this.postsService.close.next(false);
        console.log(data)
      });
  }

  getUserData(){
    this.accountService.getData().subscribe(data => {
      this.userData = data
    })
  }
  ngOnInit() {
    this.getUserData();
  }
}
