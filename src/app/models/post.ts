import { AccountBasicData } from './accountBasicData';
import { Comment } from './comment';
import { Page } from './page';
import { PageBasicData } from './pageBasicData';
import { PostLike } from './postLike';
import { Tag } from './tag';

export class Post {
  idPost: number;
  text: string;
  isPublic: boolean;
  image: string;
  status: number;
  tags?: Tag[];
  postCreatorId: number;
  postOriginalId: number;
  extraText: string;
  originalPostDoneBy: AccountBasicData;
  doneBy: AccountBasicData;
  comments: Comment[];
  postLikes: PostLike[];
  commentsNumber: number;
  likesNumber: number;
  postedOn: number;
  date: string;
  postedOnData: AccountBasicData;
  pageCreatorId: number;
  doneByPage?: PageBasicData;
  originalPostDoneByPage?: PageBasicData;
}
