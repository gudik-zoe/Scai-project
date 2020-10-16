import { Post } from './post';

export interface EditPost {
  edit: boolean;
  post?: Post;
  userData?: Account;
  id?: number;
}
