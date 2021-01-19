import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
import { EventReact } from '../models/eventReact';
import { ReactToEvent } from '../models/reactToEvent';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor(private http: HttpClient) {}
  rootUrl: string = environment.rootUrl;

  getEvents() {
    return new Promise<Event[]>((resolve, reject) => {
      this.http.get(this.rootUrl + 'events').subscribe((data: Event[]) => {
        resolve(data);
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
        (data: Event) => {
          resolve(data);
        },
        (error) => reject(error.error.message)
      );
    });
  }
}
