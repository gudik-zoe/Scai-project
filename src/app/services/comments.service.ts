import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  rootUrl: string = environment.rootUrl;
  date: number = new Date().getTime();
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getCommentsByPostId(postId: number) {
    return this.http.get(this.rootUrl + 'comments/postId/' + postId);
  }

  addCommment(post: Post, commentText: string) {
    return this.http.post(
      this.rootUrl + 'comments/idAccount/' + post.idPost,
      commentText
    );
  }

  deleteComment(commentId: number) {
    return this.http.delete(this.rootUrl + 'comments/' + commentId);
  }

  likeComment(commentId: number) {
    return this.http.post(
      this.rootUrl + 'commentLikes/idAccount' + commentId,
      {}
    );
  }

  getCommentLikes(commentId: number) {
    return this.http.get(
      this.rootUrl + 'commentLikes/likesNumber/' + commentId
    );
  }

  getCommentLikers(commentId: number) {
    return this.http.get(this.rootUrl + 'commentLikes/likers/' + commentId);
  }
  updateComment(commentId: number, newComment: String) {
    return this.http.put(
      this.rootUrl + 'comments/idAccount/' + commentId,
      newComment
    );
  }
}
