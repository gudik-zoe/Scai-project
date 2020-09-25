import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-event-com',
  templateUrl: './event-com.component.html',
  styleUrls: ['./event-com.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class EventComComponent implements OnInit {
  events = [];
  constructor(private eventsService: EventsService) {}

  going(id: number) {
    this.eventsService.going(id);
  }

  interested(id: number) {
    this.eventsService.interested(id);
  }

  notInterested(id: number) {
    this.eventsService.notInterested(id);
  }

  ngOnInit() {
    this.events = this.eventsService.events;
  }
}
