import { AccountBasicData } from './accountBasicData';
import { CommentLike } from './commentLike';
import { PageBasicData } from './pageBasicData';

export class Comment {
  idComment: number;
  text: string;
  commentCreatorId?: number;
  pageCreatorId?: number;
  relatedPostId: number;
  commentLike: CommentLike[];
  doneBy?: AccountBasicData;
  doneByPage?: PageBasicData;
  date?: string;
}
