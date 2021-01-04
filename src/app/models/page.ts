import { PageLike } from './pageLike';

export class Page {
  idPage: number;
  name: string;
  description: string;
  profilePhoto: string;
  coverPhoto: string;
  creatorId: number;
  pageLike?: PageLike[];
}
