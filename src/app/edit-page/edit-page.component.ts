import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Page } from '../models/page';
import { AccountService } from '../services/account.service';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
  @Input() page: Page;
  @Input() editPage: boolean;

  @Output() closeEditPage = new EventEmitter<boolean>();
  @Output() sendNewPage = new EventEmitter<Page>();

  showButton: boolean = true;
  errorPhrase: string;
  formData = new FormData();
  temporaryPPhoto: string | ArrayBuffer;
  temporaryCPhoto: string | ArrayBuffer;
  profilePhtotoObject;
  coverPhotoObject;
  pageName: string;
  pageDescription: string;
  photoChanged: boolean = false;

  constructor(
    private acccountService: AccountService,
    private pageService: PagesService
  ) {}

  async changeProfilePhoto(event: any) {
    if (this.acccountService.uploadImage(event)) {
      this.profilePhtotoObject = await this.acccountService.uploadImage(event);
      this.temporaryPPhoto = this.profilePhtotoObject.temporaryImage;
      this.formData.append('profilePhoto', this.profilePhtotoObject.formData);
      this.photoChanged = true;
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }

  async changeCoverPhoto(event: any) {
    if (this.acccountService.uploadImage(event)) {
      this.coverPhotoObject = await this.acccountService.uploadImage(event);
      this.temporaryCPhoto = this.coverPhotoObject.temporaryImage;
      this.formData.append('coverPhoto', this.coverPhotoObject.formData);
      this.photoChanged = true;
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }

  confirmEditPage() {
    if (this.pageDescription == null || this.pageName == null) {
      this.errorPhrase = 'cannot enter empty values';
    } else {
      this.showButton = false;
      this.formData.append('pageId', this.page.idPage.toString());
      this.pageName
        ? this.formData.append('name', this.pageName)
        : this.pageName;
      this.page.description
        ? this.formData.append('description', this.pageDescription)
        : this.page.description;
      this.pageService.updateThePage(this.formData).subscribe(
        (data: Page) => {
          console.log(data);
          this.showButton = true;
          this.sendNewPage.emit(data);
          this.close();
        },
        (error) => {
          this.showButton = true;
          this.errorPhrase = error.error.message;
        }
      );
    }
  }

  close() {
    this.closeEditPage.emit(false);
    this.temporaryPPhoto = undefined;
    this.temporaryPPhoto = undefined;
    this.formData = new FormData();
  }
  ngOnInit() {}
}
