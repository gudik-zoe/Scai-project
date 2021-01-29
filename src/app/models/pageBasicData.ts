import { PageLike } from './pageLike';

export class PageBasicData {
  idPage: number;
  name: string;
  profilePhoto: string;
  coverPhoto: string;
  likers: PageLike[];
  pageCreatorId?: number;
}
