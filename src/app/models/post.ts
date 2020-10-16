import { Comment } from './comment';
import { postLike } from './postLikes';

export class Post {
  idPosts: number;
  text: string;
  image: string;
  description: string;
  accountIdAccount: number;
  comments: Array<Comment>;
  postLikes: Array<postLike>;
}
