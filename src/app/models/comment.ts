import { AccountBasicData } from './accountBasicData';
import { CommentLike } from './commentLike';

export class Comment {
  idComment: number;
  text: string;
  commentCreatorId?: number;
  relatedPostId: number;
  commentLike: CommentLike[];
  doneBy?: AccountBasicData;
}
