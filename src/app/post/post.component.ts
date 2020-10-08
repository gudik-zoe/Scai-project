import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostsModel } from '../models/posts';
import { AccountService } from '../services/account.service';
import { CommentsService } from '../services/comments.service';
import { NotificationService } from '../services/notification.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  imgUrl: string = environment.rootUrl + '/files/';
  @Input() post;
  @Input() userData;
  @Input() posters;
  @Input() index;
  @Input() usersDetails;

  @Output() testOutput = new EventEmitter<PostsModel>();
  commentText: string;
  liked: boolean;
  openCommentsList: boolean = false;

  constructor(
    private postsService: PostsService,
    private commentService: CommentsService,
    private route: Router,
    private accountService: AccountService,
    private notificationService: NotificationService
  ) {}

  like(id: number, accountPostId: number) {
    this.postsService.likePost(id).subscribe((data) => {
      if (data) {
        // console.log(data);
        this.liked = true;
        this.post.postLikes.push({
          data,
        });
        const notification = {
          notCreator: this.userData.idAccount,
          action: 'like',
          notReceiver: accountPostId,
          postId: id,
          date: new Date(),
          seen: false,
        };
        console.log(notification);
        this.notificationService
          .addNotification(notification)
          .subscribe((data) => {
            console.log(data);
          });
        // this.testOutput.emit({ likeObject: data });
      } else {
        this.liked = false;
        this.post.postLikes.pop();
      }
    });
  }

  comment(postId: number, commentText: string) {
    this.commentService
      .addCommment(postId, commentText)
      .subscribe((data: any) => {
        data.commentedBy = [
          {
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            profilePhoto: this.userData.profilePhoto,
            idAccount: this.userData.idAccount,
          },
        ];
        this.post.comments.push(data);
        console.log(data);
        this.commentText = null;
      });
  }

  sharePost(post) {
    this.postsService
      .addPost(post.text, post.image, post.description)
      .subscribe((data: PostsModel) => {
        this.testOutput.emit(data);
      });
  }

  goToDescription(id: number): void {
    this.route.navigate(['/description', id]);
  }

  openComments() {
    this.openCommentsList = !this.openCommentsList;
  }

  // checkIfUserLikedPost(postId){

  // }

  ngOnInit() {}
}
