import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  rootUrl: string = environment.rootUrl;
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getCommentsByPostId(postId: number) {
    return this.http.get('http://localhost:8080/comments/postId/' + postId);
  }

  addCommment(postId: number, commentText: string) {
    return this.http.post(
      this.rootUrl + 'comments/' + this.accountService.getId() + '/' + postId,
      {
        text: commentText,
      }
    );
  }

  deleteComment(commentId: number) {
    return this.http.delete(this.rootUrl + 'comments/' + commentId);
  }

  likeComment(commentId: number) {
    return this.http.post(
      this.rootUrl +
        'commentLikes/' +
        this.accountService.getId() +
        '/' +
        commentId,
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
  updateComment(postId: number, newComment: Comment) {
    return this.http.put(
      this.rootUrl + 'comments/' + this.accountService.getId() + '/' + postId,
      newComment
    );
  }
}
