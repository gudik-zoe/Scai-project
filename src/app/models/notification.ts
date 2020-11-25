import { AccountBasicData } from './accountBasicData';

export class Notification {
  idNotification?: number;
  notCreator: number;
  action: string;
  notReceiver: number;
  date: Date;
  relatedPostId: number;
  seen: boolean;
  doneBy?: AccountBasicData;
  dateInMinutes?: number;
  timeUnit?: string;
  time?: number;
}
