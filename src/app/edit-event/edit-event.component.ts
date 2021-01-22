import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Event } from '../models/event';
import { AccountService } from '../services/account.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private eventService: EventsService
  ) {}

  @Input() event: Event;

  @Output() closeEmitter = new EventEmitter<boolean>();

  @Output() updateEvent = new EventEmitter<Event>();

  formData = new FormData();
  eventPhotoObject;
  when: string;
  time: string;
  name: string;
  description: string;
  where: string;
  temporaryEventPhoto: string | ArrayBuffer;
  showButton: boolean = true;

  errorPhrase: string;

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

  close() {
    this.closeEmitter.emit(false);
    this.temporaryEventPhoto = undefined;
    this.formData = new FormData();
  }

  async changePhoto(event) {
    if (this.accountService.uploadImage(event)) {
      this.eventPhotoObject = await this.accountService.uploadImage(event);
      this.temporaryEventPhoto = this.eventPhotoObject.temporaryImage;
      this.formData.append('eventPhoto', this.eventPhotoObject.formData);
    } else {
      this.errorPhrase = 'file type not supported';
    }
  }
  editEvent() {
    let differenceInHours =
      (Date.parse(this.when + ' ' + this.time) - new Date().getTime()) /
      3600000;
    if (differenceInHours < 3) {
      this.errorPhrase = 'the event should be at least 3 hours from now';
    } else {
      this.showButton = false;
      this.formData.append('when', this.when + ' ' + this.time);
      this.formData.append('where', this.where);
      this.formData.append('name', this.name);
      this.formData.append('description', this.description);
      this.formData.append('eventId', this.event.idEvent.toString());
      this.eventService.editEvent(this.formData).subscribe(
        (data: Event) => {
          this.showButton = true;
          this.updateEvent.emit(data);
          this.close();
        },
        (error) => {
          this.showButton = true;
          this.errorPhrase = error.error.message;
        }
      );
    }
  }
  ngOnInit() {
    if (this.event) {
      this.where = this.event.location;
      this.time = this.event.time;
      this.name = this.event.name;
      this.description = this.event.description;
    }
  }
}
