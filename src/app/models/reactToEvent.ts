import { AccountBasicData } from './accountBasicData';

export class ReactToEvent {
  idEvent: number;
  status: number;
  constructor(idEvent: number, status: number) {
    (this.idEvent = idEvent), (this.status = status);
  }
}
