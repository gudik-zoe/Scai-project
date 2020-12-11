import { ChatMessageDto } from './chatMessageDto';

export class AccountBasicData {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  idAccount: number;
  coverPhoto?: string;
  unSeenMessages?: number;
}
