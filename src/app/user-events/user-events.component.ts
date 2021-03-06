import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountBasicData } from '../models/accountBasicData';
import { AccountService } from '../services/account.service';
import { EventsService } from '../services/events.service';
import { Event } from '../models/event';
import { ReactToEvent } from '../models/reactToEvent';
import { EventReact } from '../models/eventReact';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css'],
})
export class UserEventsComponent implements OnInit {
  constructor(
    private aroute: ActivatedRoute,
    private accountService: AccountService,
    private eventService: EventsService
  ) {}
  id: number;
  userData: AccountBasicData;
  event: Event;
  isInterested = [];
  isGoing = [];
  iGoing: boolean = false;
  iInterested: boolean = false;
  errorPhrase: string;
  editMode: boolean = false;

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  going(event: Event) {
    const reactToEvent = new ReactToEvent(event.idEvent, 1);
    this.eventService.goingToEvent(reactToEvent).subscribe(
      (data: EventReact) => {
        if (data && data.status == 1) {
          this.iGoing = true;
          this.isGoing.push(data);
          if (this.iInterested) {
            this.iInterested = false;
            this.isInterested.pop();
          }
        } else if (!data) {
          this.iGoing = false;
          this.isGoing.pop();
        }
      },
      (error) => (this.errorPhrase = error.error.message)
    );
  }

  openEditMode() {
    this.editMode = true;
  }

  updateEvent(data: Event) {
    this.event.name = data.name;
    this.event.coverPhoto = data.coverPhoto;
    this.event.location = data.location;
    this.event.time = data.time;
  }

  closeInParent(data: boolean) {
    this.editMode = data;
  }
  interested(event: Event) {
    const reactToEvent = new ReactToEvent(event.idEvent, 2);
    this.eventService
      .goingToEvent(reactToEvent)
      .subscribe((data: EventReact) => {
        if (data && data.status == 2) {
          this.iInterested = true;
          this.isInterested.push(data);
          if (this.isGoing) {
            this.iGoing = false;
            this.isGoing.pop();
          }
        } else if (!data) {
          this.iInterested = false;
          this.isInterested.pop();
        }
      });
  }

  async getEvent() {
    this.event = this.eventService.events.find(
      (item) => item.idEvent == this.id
    );
    if (!this.event) {
      this.event = await this.eventService.getEventData(this.id);
    }
    for (let react of this.event.eventFollower) {
      if (react.status == 1) {
        this.isGoing.push(react);
      } else {
        this.isInterested.push(react);
      }
      if (
        react.eventReactCreatorId == this.userData.idAccount &&
        react.status == 1
      ) {
        this.iGoing = true;
      } else if (
        react.eventReactCreatorId == this.userData.idAccount &&
        react.status == 2
      ) {
        this.iInterested = true;
      }
    }
  }
  ngOnInit() {
    this.aroute.params.subscribe((params) => {
      this.id = params['id'];
      this.getUserData();
      this.getEvent();
    });
  }
}
