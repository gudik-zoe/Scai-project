export class Notification {
  idNotification: number;
  notCreator: number;
  action: string;
  notReceiver: number;
  date: number;
  relatedPostId: number;
  seen: boolean;
  dateInMinutes?: number;
}
