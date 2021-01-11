import { AccountBasicData } from './accountBasicData';
import { PageBasicData } from './pageBasicData';

export class CommentLike {
  idCommentLike: number;
  commentLikeCreatorId: number;
  pageCreatorId: number;
  relatedCommentId: number;
  doneBy?: AccountBasicData;
  doneByPage?: PageBasicData;
}
