export class ChatMessageDto {
  idMessage?: number;
  message: string;
  idSender: number;
  idReceiver: number;
  seen: boolean;
  date: number;

  // constructor(
  //   message: string,
  //   idSender: number,
  //   idReceiver: number,
  //   seen: boolean,
  //   date: number
  // ) {
  //   this.idSender = idSender;
  //   this.message = message;
  //   this.idReceiver = idReceiver;
  //   this.seen = seen;
  //   this.date = date;
  // }
}
