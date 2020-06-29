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

  ngOnInit() {
    this.events = this.eventsService.events;
  }
}
