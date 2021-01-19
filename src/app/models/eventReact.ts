import { Event } from '../models/event';
export class EventReact {
  idEventReact: number;
  status: number;
  relatedEventId: number;
  eventReactCreatorId: number;
  eventData?: Event;
}
