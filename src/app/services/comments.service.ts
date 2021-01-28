import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { NotificationService } from './notification.service';
import { PagesService } from './pages.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  rootUrl: string = environment.rootUrl;
  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private notificationService: NotificationService,
    private pageService: PagesService
  ) {}

  getCommentsByPostId(postId: number) {
    return this.http.get(this.rootUrl + 'comments/postId/' + postId);
  }

  addCommment(post: Post, commentText: string, userComment: boolean) {
    return new Promise<Comment>((resolve, reject) => {
      this.http
        .post(
          this.rootUrl +
            'comments/idAccount/' +
            post.idPost +
            '/' +
            userComment,
          commentText
        )
        .subscribe(
          async (comment: Comment) => {
            comment.commentLike = [];
            comment.date = this.notificationService.timeCalculation(
              comment.date
            );
            if (comment.commentCreatorId) {
              comment.doneBy = { ...this.accountService.userData };
            } else {
              comment.doneByPage = await this.pageService.getPageData(
                comment.pageCreatorId
              );
            }
            resolve(comment);
          },
          (error) => {
            reject(error.error.message);
          }
        );
    });
  }

  deleteComment(commentId: number) {
    return this.http.delete(this.rootUrl + 'comments/' + commentId);
  }

  likeComment(commentId: number) {
    return this.http.post(
      this.rootUrl + 'commentLikes/idAccount/' + commentId,
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
