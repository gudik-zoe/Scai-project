import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-event-com',
  templateUrl: './event-com.component.html',
  styleUrls: ['./event-com.component.css'],
})
export class EventComComponent implements OnInit {
  events = [];
  constructor(private eventsService: EventsService) {}

  going(id) {
    this.eventsService.going(id);
  }

  interested(id) {
    this.eventsService.interested(id);
  }

  notInterested(id) {
    this.eventsService.notInterested(id);
  }

  ngOnInit() {
    this.events = this.eventsService.events;
  }
}
