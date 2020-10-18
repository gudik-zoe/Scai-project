import { Comment } from './comment';
import { PostLike } from './postLike';

export class Post {
  idPost: number;
  text: string;
  image: string;
  description: string;
  postCreatorId: number;
  postOriginalId?: number;
  comments: Array<Comment>;
  postLikes: Array<PostLike>;
}