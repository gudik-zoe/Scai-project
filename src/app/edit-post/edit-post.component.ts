import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
import { Post } from '../models/post';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  constructor(
    private pageService: PagesService,
    private accountService: AccountService
  ) {}

  // editPostComponent: boolean;
  @Input() postToEditComponent: Post;
  @Output() confirmEditInParent = new EventEmitter<any>();
  userData: AccountBasicData;
  inputData: string;
  showImage: boolean = true;
  image: object;
  postImage: string | ArrayBuffer;
  imageChanged: boolean = false;
  errorPhrase: string = '';
  rootUrl: string = environment.rootUrl;
  postWithImage: boolean = true;
  hideButton: boolean = false;
  formData = new FormData();
  postPhotoObject;

  close() {
    this.hideButton = false;
    this.image = undefined;
    this.imageChanged = false;
    this.showImage = true;
    this.postWithImage = true;
    this.postImage = undefined;
    this.errorPhrase = '';
    this.confirmEditInParent.emit(undefined);
    // this.editPostComponent = false;
    this.formData = new FormData();
  }

  async uploadImage(event) {
    if (this.accountService.uploadImage(event)) {
      this.postPhotoObject = await this.accountService.uploadImage(event);
      this.postImage = this.postPhotoObject.temporaryImage;
      this.formData.append('image', this.postPhotoObject.formData);
      this.postWithImage = true;
      this.showImage = false;
      this.imageChanged = true;
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }

  deleteImage() {
    this.showImage = false;
    this.imageChanged = true;
    this.postWithImage = false;
  }

  userPost: boolean;
  editUserPost() {
    this.formData.append('text', this.inputData);
    if (this.postToEditComponent.doneBy) {
      this.userPost = true;
    } else {
      this.userPost = false;
    }
    this.confirmEditInParent.emit({
      formData: this.formData,
      idPost: this.postToEditComponent.idPost,
      postWithImage: this.postWithImage,
      userPost: this.userPost,
    });
  }

  confirmEdit() {
    this.hideButton = true;
    if (this.imageChanged && !this.formData.get('image')) {
      this.hideButton = false;
      this.postToEditComponent.image = null;
    }
    if (!this.inputData.trim() && !this.postToEditComponent.image) {
      this.hideButton = false;
      this.errorPhrase = 'cannot add an empty post';
      this.postToEditComponent.text = this.postToEditComponent.text;
      this.postToEditComponent.image = this.postToEditComponent.image;
    } else if (
      this.postToEditComponent.text == this.inputData.trim() &&
      !this.imageChanged
    ) {
      this.hideButton = false;
      this.errorPhrase = "post wasn't change";
    } else if (!this.inputData.trim()) {
      this.hideButton = false;
      this.errorPhrase = "canno't add an empty text";
    } else {
      this.editUserPost();
    }
  }

  ngOnInit() {
    this.inputData = this.postToEditComponent.text;
  }
}
