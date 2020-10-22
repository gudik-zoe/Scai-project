import { AccountBasicData } from './accountBasicData';
import { Comment } from './comment';
import { PostLike } from './postLike';

export class Post {
  idPost?: number;
  text?: string;
  image?: string;
  description?: string;
  postCreatorId?: number;
  postOriginalId?: number;
  extraText?: string;
  originalPostDoneBy?: AccountBasicData;
  doneBy?: AccountBasicData;
  comments?: Comment[];
  postLikes?: PostLike[];
  commentsNumber?: number;
  likesNumber?: number;
}
