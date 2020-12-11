import { AccountBasicData } from './accountBasicData';
import { ChatMessageDto } from './chatMessageDto';

export class Relationship {
  idRelationship: number;
  userOneId: number;
  userTwoId: number;
  status: number;
  doneBy?: AccountBasicData;
  unSeenMessages: ChatMessageDto[];
}
