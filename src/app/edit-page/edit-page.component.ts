import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

import { Page } from '../models/page';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
  @Input() page: Page;
  @Input() editPage: boolean;

  @Output() closeEditPage = new EventEmitter<boolean>();

  constructor() {}

  changeProfilePhoto(event: any) {
    console.log('changing profile photo');
  }

  changeCoverPhoto(event: any) {
    console.log('changing cover photo');
  }
  close() {
    this.closeEditPage.emit(false);
  }
  ngOnInit() {}
}
