import { AccountBasicData } from './accountBasicData';

export class CommentLike {
  idCommentLike: number;
  commentLikeCreatorId: number;
  relatedCommentId: number;
  doneBy?: AccountBasicData;
}
