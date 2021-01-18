import { Component, OnInit } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { Event } from '../models/event';
import { EventReact } from '../models/eventReact';
import { ReactToEvent } from '../models/reactToEvent';
import { AccountService } from '../services/account.service';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events-container',
  templateUrl: './events-container.component.html',
  styleUrls: ['./events-container.component.css'],
})
export class EventsContainerComponent implements OnInit {
  events: Event[];
  userData: AccountBasicData;
  constructor(
    private eventService: EventsService,
    private accountService: AccountService
  ) {}

  async getEvents() {
    this.events = await this.eventService.getEvents();
    console.log(this.events);
  }

  async getUserData() {
    this.userData =
      this.accountService.userData ||
      (await this.accountService.getTheLoggedInUserData());
  }

  goingInParent(event: Event) {
    const reactToEvent = new ReactToEvent(event.idEvent, 1);
    this.eventService
      .goingToEvent(reactToEvent)
      .subscribe((data: EventReact) => {
        if (data && data.status == 1) {
          event.eventFollower.pop();
          event.eventFollower.push(data);
        } else if (!data) {
          event.eventFollower.pop();
        }
      });
  }

  interestedInParent(event: Event) {
    const reactToEvent = new ReactToEvent(event.idEvent, 2);
    this.eventService
      .goingToEvent(reactToEvent)
      .subscribe((data: EventReact) => {
        if (data && data.status == 2) {
          event.eventFollower.pop();
          event.eventFollower.push(data);
        } else if (!data) {
          event.eventFollower.pop();
        }
      });
  }
  ngOnInit() {
    this.getUserData();
    this.getEvents();
  }
}
