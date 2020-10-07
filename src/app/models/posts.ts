import { commentModel } from './comment';
import { postLikesModel } from './postLikes';

export class PostsModel {
  idPosts: number;
  text: string;
  image: string;
  description: string;
  accountIdAccount: number;
  comments: Array<commentModel>;
  postLikes: Array<postLikesModel>;
}
