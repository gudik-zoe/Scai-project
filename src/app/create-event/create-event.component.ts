import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AccountBasicData } from '../models/accountBasicData';
import { AccountService } from '../services/account.service';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Custome } from '../log-in/validator';
import { eventNames } from 'process';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css'],
})
export class CreateEventComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private eventService: EventsService,
    private route: Router,
    private fb: FormBuilder
  ) {}
  userData: AccountBasicData;
  createEvent: FormGroup;
  errorPhrase: string;
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

  minDate = new Date();
  maxDate = new Date(2025, 11, 31);

  async uploadEventPhoto(event: any) {
    if (this.accountService.uploadImage(event)) {
      this.eventPhotoObject = await this.accountService.uploadImage(event);
      this.eventTemporaryPhoto = this.eventPhotoObject.temporaryImage;
      this.formData.append('eventPhoto', this.eventPhotoObject.formData);
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }

  fillCreateEventForm() {
    this.createEvent = this.fb.group({
      eventName: ['event name', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  createTheEvent() {
    let differenceInHours =
      (Date.parse(
        this.createEvent.get('date').value +
          ' ' +
          this.createEvent.get('startTime').value
      ) -
        new Date().getTime()) /
      3600000;
    if (differenceInHours < 3) {
      this.errorPhrase = 'the event should be at least 3 hours from now';
    } else {
      this.loading = true;

      this.formData.append(
        'when',
        this.createEvent.get('date').value +
          ' ' +
          this.createEvent.get('startTime').value
      );
      this.formData.append('where', this.createEvent.get('location').value);
      this.formData.append('name', this.createEvent.get('eventName').value);
      this.formData.append(
        'description',
        this.createEvent.get('description').value
      );
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
    this.fillCreateEventForm();
    this.getUserData();
  }
}
