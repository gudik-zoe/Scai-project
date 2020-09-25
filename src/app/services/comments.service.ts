import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getCommentsByPostId(postId) {
    return this.http.get('http://localhost:8080/comments/postId/' + postId);
  }

  addCommment(postId) {
    return this.http.post(
      'http://localhost:8080/comments/' +
        this.accountService.getId() +
        '/' +
        postId,
      {
        text: 'my first comment from vsc',
      }
    );
  }

  deleteComment(commentId) {
    return this.http.delete('http://localhost:8080/comments/' + commentId);
  }

  likeComment(commentId) {
    return this.http.post(
      'http://localhost:8080/commentLikes/' +
        this.accountService.getId() +
        '/' +
        commentId,
      {}
    );
  }

  getCommentLikes(commentId) {
    return this.http.get(
      'http://localhost:8080/commentLikes/likesNumber/' + commentId
    );
  }

  getCommentLikers(commentId) {
    return this.http.get(
      'http://localhost:8080/commentLikes/likers/' + commentId
    );
  }
  updateComment(postId, commentId) {
    return this.http.put(
      'http://localhost:8080/comments/' +
        this.accountService.getId() +
        '/' +
        postId,
      {
        idComment: commentId,
        text: 'edited comment',
      }
    );
  }
}
