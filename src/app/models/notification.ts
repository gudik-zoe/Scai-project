import { AccountBasicData } from './accountBasicData';

export class Notification {
  idNotification: number;
  notCreator: number;
  action: string;
  notReceiver: number;
  date: number;
  relatedPostId: number;
  seen: boolean;
  doneBy?: AccountBasicData;
  dateInMinutes?: number;
}
