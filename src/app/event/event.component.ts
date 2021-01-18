import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountBasicData } from '../models/accountBasicData';
import { Event } from '../models/event';
import { EventReact } from '../models/eventReact';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  @Input() event: Event;
  @Input() userData: AccountBasicData;
  @Input() i: number;
  index: string;

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
  }

  getGoing() {
    if (this.userData) {
      const check = this.event.eventFollower.find(
        (item: EventReact) =>
          item.eventReactCreatorId == this.userData.idAccount &&
          item.status == 1
      );
      return check;
    }
  }

  getInterested() {
    if (this.userData) {
      const check = this.event.eventFollower.find(
        (item: EventReact) =>
          item.eventReactCreatorId == this.userData.idAccount &&
          item.status == 2
      );
      return check;
    }
  }
  interested() {
    this.interestedEventEmitter.emit(this.event);
  }
  ngOnInit() {
    this.getIndex();
  }
}
