import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountBasicData } from '../models/accountBasicData';
import { Post } from '../models/post';
import { PostOption } from '../models/postOption';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
})
export class ShareDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public dataToPass: any) {}

  postToShare: Post = this.dataToPass.post;

  userData: AccountBasicData = this.dataToPass.userData;

  postOptions: PostOption[] = [
    { status: 'public', icon: 'public' },
    { status: 'just-friends', icon: 'groups' },
    { status: 'only-me', icon: 'lock' },
  ];

  inputData: string;
  formData = new FormData();
  dropDownBtnText: PostOption = { status: 'public', icon: 'public' };

  confirmShare() {
    this.formData.append('extraText', this.inputData);
    this.formData.append('postOption', this.dropDownBtnText.status);
  }

  selectOption(postOption: PostOption) {
    this.dropDownBtnText = postOption;
  }

  ngOnInit(): void {}
}
