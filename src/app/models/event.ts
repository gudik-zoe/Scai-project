import { AccountBasicData } from './accountBasicData';
import { EventReact } from './eventReact';
import { ReactToEvent } from './reactToEvent';

export class Event {
  idEvent: number;
  name: string;
  when: string;
  where: string;
  coverPhoto: string;
  eventCreatorId: number;
  description: string;
  doneBy: AccountBasicData;
  eventFollower: EventReact[];
}
