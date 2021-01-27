import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/edit-post.component';
import { AccountBasicData } from '../models/accountBasicData';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public post: Post,
    private accountService: AccountService
  ) {}
  ngOnDestroy() {
    this.formData = new FormData();
  }

  inputData: string;
  formData = new FormData();
  errorPhrase: string;
  postWithImage: boolean;
  showPostPhoto: boolean = true;
  removePhoto() {
    this.showPostPhoto = false;
    this.postWithImage = false;
  }
  postPhotoObject;
  postImage: string | ArrayBuffer;
  async uploadImage(event) {
    if (this.accountService.uploadImage(event)) {
      this.postPhotoObject = await this.accountService.uploadImage(event);
      this.postImage = this.postPhotoObject.temporaryImage;
      this.formData.append('image', this.postPhotoObject.formData);
      this.postWithImage = true;
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }
  data = {};
  editPost() {
    if (
      this.inputData != this.post.text ||
      this.formData.get('image') != null ||
      this.post.image != null
    ) {
      this.formData.append('text', this.inputData);
      this.data['formData'] = this.formData;
      this.data['postWithImage'] = this.postWithImage;
    }
  }
  ngOnInit() {
    this.inputData = this.post.text;
  }
}
