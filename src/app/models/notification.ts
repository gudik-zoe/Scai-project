import { AccountBasicData } from './accountBasicData';

export class Notification {
  idNotification?: number;
  notCreator: number;
  action: string;
  notReceiver: number;
  date: string;
  relatedPostId: number;
  seen: boolean;
  doneBy?: AccountBasicData;
  timeUnit?: string;
}
