import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
import { EventReact } from '../models/eventReact';
import { ReactToEvent } from '../models/reactToEvent';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  rootUrl: string = environment.rootUrl;
  events: Event[] = [];

  getEvents() {
    return new Promise<Event[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'events')
        .subscribe(async (data: Event[]) => {
          this.events = data;
          for (let event of this.events) {
            event.doneBy = await this.accountService.getBasicAccountDetails(
              event.eventCreatorId
            );
            // if (Date.parse(event.time) - new Date().getTime() < 0) {
            //   this.events = this.events.filter(
            //     (item) => item.idEvent != event.idEvent
            //   );
            // } else {
            //   resolve(this.events);
            // }
            resolve(this.events);
          }
          reject('unknown error occured');
        });
    });
  }

  getMyEvents() {
    return new Promise<Event[]>((resolve, reject) => {
      this.http.get(this.rootUrl + 'myEvents').subscribe((data: Event[]) => {
        resolve(data);
        reject('unknown error occured');
      });
    });
  }

  goingToEvent(data: ReactToEvent) {
    return this.http.post(this.rootUrl + 'reactToEvent', data);
  }

  getLinkedEvents() {
    return new Promise<EventReact[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'linkedEvents')
        .subscribe(async (data: EventReact[]) => {
          for (let linkedEvent of data) {
            linkedEvent.eventData = await this.getEventData(
              linkedEvent.relatedEventId
            );
          }
          resolve(data);
          reject('unknown error occured');
        });
    });
  }

  getEventData(eventId: number) {
    return new Promise<Event>((resolve, reject) => {
      this.http.get(this.rootUrl + 'getEventById/' + eventId).subscribe(
        async (data: Event) => {
          data.doneBy = await this.accountService.getBasicAccountDetails(
            data.eventCreatorId
          );
          resolve(data);
        },
        (error) => reject(error.error.message)
      );
    });
  }

  createEvent(formData: FormData) {
    return this.http.post(this.rootUrl + 'createEvent', formData);
  }

  editEvent(formData: FormData) {
    return this.http.put(this.rootUrl + 'editEvent', formData);
  }
}
