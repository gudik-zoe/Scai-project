import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Custome } from '../log-in/validator';
import { Page } from '../models/page';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private pageService: PagesService,
    private route: Router
  ) {}

  createPage: FormGroup;

  formData = new FormData();
  pageTemporaryProfilePhoto: string | ArrayBuffer;
  pageTemporaryCoverPhoto: string | ArrayBuffer;
  errorPhrase: string;
  loading: boolean;

  uploadPageProfilePhoto(event: any) {
    if (
      event.target.files.length > 0 &&
      event.target.files[0].type.includes('image')
    ) {
      const image = event.target.files[0];
      this.formData.append('profilePhoto', image);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.pageTemporaryProfilePhoto = event.target.result;
      };
    } else {
      this.errorPhrase = 'type not supported';
    }
  }

  uploadPageCoverPhoto(event: any) {
    if (
      event.target.files.length > 0 &&
      event.target.files[0].type.includes('image')
    ) {
      const image = event.target.files[0];
      this.formData.append('coverPhoto', image);
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        this.pageTemporaryCoverPhoto = event.target.result;
      };
    } else {
      this.errorPhrase = 'type not supported';
    }
  }
  fillCreatePageForm() {
    this.createPage = this.fb.group({
      pageName: ['page name', Validators.required],
      description: ['description', Validators.required],
    });
  }

  createthePage() {
    this.loading = true;
    this.formData.append('pageName', this.createPage.get('pageName').value);
    this.formData.append(
      'description',
      this.createPage.get('description').value
    );
    this.pageService.createPage(this.formData).subscribe(
      (data: Page) => {
        if (data) {
          this.loading = false;
          this.pageService.userAccess = true;
          this.route.navigate(['user-pages', data.idPage]);
        }
      },
      (error) => {
        this.loading = false;
        this.errorPhrase = error.error.message;
      }
    );
  }

  ngOnInit() {
    this.fillCreatePageForm();
  }
}
