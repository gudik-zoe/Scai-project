import { PageLike } from './pageLike';
import { Post } from './post';

export class Page {
  idPage: number;
  name: string;
  description: string;
  profilePhoto: string;
  coverPhoto: string;
  pageCreatorId: number;
  posts: Post[];
  pageLike?: PageLike[];
}
