import { Comment } from './comment';
import { PostLike } from './postLike';

export class Post {
  idPost: number;
  text: string;
  image: string;
  description: string;
  postCreatorId: number;
  postOriginalId?: number;
  extraText?: string;
  doneBy?: any;
  comments: Array<Comment>;
  postLikes: Array<PostLike>;
}
