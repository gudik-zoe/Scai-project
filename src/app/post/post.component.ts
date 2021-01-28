import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { PostLike } from '../models/postLike';
import { CommentsService } from '../services/comments.service';
import { NotificationService } from '../services/notification.service';
import { Comment } from '../models/comment';
import { AccountBasicData } from '../models/accountBasicData';
import { CommentLike } from '../models/commentLike';
import { PageBasicData } from '../models/pageBasicData';
import { Page } from '../models/page';
import { PageLike } from '../models/pageLike';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  @Input() userData: AccountBasicData;
  @Input() commentText: string;
  @Input() status: string;
  @Input() page: Page;
  @Input() isAdmin: boolean;

  @Output() testOutput = new EventEmitter<Post>();
  @Output() deletePostEvent = new EventEmitter<Post>();
  @Output() likePostEvent = new EventEmitter<Post>();
  @Output() commentPostEvent = new EventEmitter<any>();
  @Output() likeCommentEvent = new EventEmitter<Comment>();
  @Output() editPostEvent = new EventEmitter<Post>();
  @Output() sharePostEvent = new EventEmitter<any>();

  openCommentsList: boolean = false;
  editCommentOn: boolean;
  commentId: number;
  editCommentValue: string;
  errorPhrase: string = '';
  commentLikers: AccountBasicData[];
  pageLike: PageLike;
  likedByMe: boolean;
  iCommented: boolean;
  pageCommented: boolean;
  iLikedComment: boolean;

  constructor(
    private commentService: CommentsService,
    private route: Router,
    private notificationService: NotificationService
  ) {}

  like(post: Post) {
    this.likePostEvent.emit(post);
    this.likedByMe = !this.likedByMe;
  }

  comment(post: Post, commentText: string) {
    if (commentText == undefined || !commentText.trim()) {
      this.errorPhrase = 'cannot add an empty comment';
      commentText = '';
    } else {
      this.errorPhrase = '';
      this.commentPostEvent.emit({ post, commentText });
      this.iCommented = true;
      this.commentText = '';
    }
  }

  likeComment(comment: Comment) {
    this.likeCommentEvent.emit(comment);
  }
  toDescription(id: number) {
    this.route.navigate(['/description', id]);
  }

  sharePost(post: Post) {
    this.sharePostEvent.emit(post);
  }

  editPost(post: Post) {
    this.editPostEvent.emit(post);
  }

  deletePost(post: Post) {
    this.deletePostEvent.emit(post);
  }

  getIfUserLiked() {
    if (this.userData) {
      this.likedByMe = this.post.postLikes.some(
        (item) => item.postLikeCreatorId == this.userData.idAccount
      );
    }
  }

  getIfUserCommented() {
    if (this.userData && !this.page) {
      this.iCommented = this.post.comments.some(
        (item) => item.commentCreatorId == this.userData.idAccount
      );
    } else if (this.page) {
      this.iCommented = this.post.comments.some(
        (item) => item.pageCreatorId == this.page.idPage
      );
    }
  }

  getCommentLike(comment: Comment) {
    if (!this.page) {
      return (this.iLikedComment = comment.commentLike.some(
        (item) => item.commentLikeCreatorId == this.userData.idAccount
      ));
    } else {
      return (this.iLikedComment = comment.commentLike.some(
        (item) => item.pageCreatorId == this.page.idPage
      ));
    }
  }

  hoverFunction(comment: Comment) {
    if (comment.commentLike.length > 0) {
      this.commentService
        .getCommentLikers(comment.idComment)
        .subscribe((data: AccountBasicData[]) => {
          this.commentLikers = data;
        });
    } else {
      return null;
    }
  }

  openComments() {
    this.openCommentsList = !this.openCommentsList;
  }

  editComment(text: string, id: number) {
    this.commentId = id;
    this.editCommentOn = !this.editCommentOn;
    this.editCommentValue = text;
  }

  confirmEditComment(comment: Comment, newComment: string) {
    if (newComment == undefined || !newComment.trim()) {
      this.errorPhrase = 'cannot add an empty comment';
    } else if (newComment.trim() == comment.text) {
      this.editCommentOn = false;
    } else {
      this.commentService
        .updateComment(comment.idComment, newComment.trim())
        .subscribe((data: Comment) => {
          this.editCommentOn = false;
          comment.text = data.text;
          this.errorPhrase = '';
        });
    }
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id).subscribe((data) => {
      this.post.comments = this.post.comments.filter(
        (item) => item.idComment !== id
      );
      if (!this.page) {
        this.iCommented = this.post.comments.some(
          (item) => item.commentCreatorId == this.userData.idAccount
        );
      } else {
        this.iCommented = this.post.comments.some(
          (item) => item.pageCreatorId == this.page.idPage
        );
      }
    });
  }

  getIfPageIsLikedByLoggedInUser() {
    return (this.pageLike = this.page.pageLike.find(
      (item) => item.pageLikeCreatorId == this.userData.idAccount
    ));
  }

  ngOnInit() {
    if (this.page) {
      this.getIfPageIsLikedByLoggedInUser();
    }
    this.getIfUserLiked();
    this.getIfUserCommented();
  }
}
