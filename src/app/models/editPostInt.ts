import { AccountModel } from './account';
import { PostsModel } from './posts';

export interface editPost {
  edit: boolean;
  post?: PostsModel;
  userData?: AccountModel;
  id?: number;
}
