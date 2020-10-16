import { Post } from './post';

export interface editPost {
  edit: boolean;
  post?: Post;
  userData?: Account;
  id?: number;
}
