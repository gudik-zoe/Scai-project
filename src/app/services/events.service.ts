import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';
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

  goingToEvent(data: ReactToEvent) {
    return this.http.post(this.rootUrl + 'reactToEvent', data);
  }
}
