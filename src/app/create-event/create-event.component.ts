import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountBasicData } from '../models/accountBasicData';
import { AccountService } from '../services/account.service';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private eventService: EventsService,
    private route: Router
  ) {}
  userData: AccountBasicData;
  time: string;
  name: string;
  where: string;
  when: string;
  errorPhrase: string;
  description: string;
  eventTemporaryPhoto: string | ArrayBuffer;
  eventPhotoObject;
  loading = false;
  formData = new FormData();
  date = new Date();
  today =
    this.date.getFullYear() +
    '-' +
    ('0' + (this.date.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + this.date.getDate()).slice(-2);

  now =
    ('0' + this.date.getHours()).slice(-2) +
    ':' +
    ('0' + this.date.getMinutes()).slice(-2);

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  async uploadEventPhoto(event: any) {
    if (this.accountService.uploadImage(event)) {
      this.eventPhotoObject = await this.accountService.uploadImage(event);
      this.eventTemporaryPhoto = this.eventPhotoObject.temporaryImage;
      this.formData.append('eventPhoto', this.eventPhotoObject.formData);
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }
  createEvent() {
    let differenceInHours =
      (Date.parse(this.when + ' ' + this.time) - new Date().getTime()) /
      3600000;
    if (differenceInHours < 3 && this.name && this.where) {
      this.errorPhrase = 'the event should be at least 3 hours from now';
    } else {
      this.loading = true;
      this.formData.append('when', this.when + ' ' + this.time);
      this.formData.append('where', this.where);
      this.formData.append('name', this.name);
      this.formData.append('description', this.description);
      this.eventService.createEvent(this.formData).subscribe(
        (data: Event) => {
          this.loading = false;
          this.route.navigate(['user-events', data.idEvent]);
        },
        (error) => {
          this.loading = false;
          this.errorPhrase = error.error.message;
        }
      );
      this.formData = new FormData();
    }
  }
  ngOnInit() {
    this.getUserData();
  }
}
