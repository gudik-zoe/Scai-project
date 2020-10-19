import { AccountBasicData } from './accountBasicData';

export class PostLike {
  idLike: number;
  relatedPostId: number;
  postLikeCreatorId: number;
  doneBy?: AccountBasicData;
}
