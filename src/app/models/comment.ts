import { AccountBasicData } from './accountBasicData';

export class Comment {
  idComment: number;
  text: string;
  commentCreatorId?: number;
  relatedPostId: number;
  doneBy?: AccountBasicData;
}
