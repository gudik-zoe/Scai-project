export class ChatMessageDto {
  idMessage?: number;
  message: string;
  idSender?: number;
  idReceiver: number;
  seen: boolean;
  date?: string;
}
