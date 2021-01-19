import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountBasicData } from '../models/accountBasicData';
import { Event } from '../models/event';
import { EventReact } from '../models/eventReact';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  constructor(private route: Router) {}
  @Input() event: Event;
  @Input() userData: AccountBasicData;
  @Input() i: number;
  @Input() errorPhrase: number;
  index: string;
  iGoing: boolean;
  iInterested: boolean;
  @Output() goingEventEmitter = new EventEmitter<Event>();
  @Output() interestedEventEmitter = new EventEmitter<Event>();

  getIndex() {
    if (this.i == 0) {
      this.index = '0.8s';
    } else {
      this.index = this.i + 's';
    }
  }

  going() {
    this.goingEventEmitter.emit(this.event);
    if (this.iInterested) {
      this.iInterested = false;
    }
    this.iGoing = !this.iGoing;
  }

  goToEvent(eventId: number) {
    this.route.navigate(['/user-events', eventId]);
  }

  interested() {
    this.interestedEventEmitter.emit(this.event);
    if (this.iGoing) {
      this.iGoing = false;
    }
    this.iInterested = !this.iInterested;
  }

  getIfReacted() {
    for (let react of this.event.eventFollower) {
      if (
        react.status == 1 &&
        react.eventReactCreatorId == this.userData.idAccount
      ) {
        this.iGoing = true;
      } else if (
        react.status == 2 &&
        react.eventReactCreatorId == this.userData.idAccount
      ) {
        this.iInterested = true;
      }
    }
  }
  ngOnInit() {
    this.getIndex();
    this.getIfReacted();
  }
}
