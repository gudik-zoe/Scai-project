import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommentsService } from '../services/comments.service';
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

  @Output() testOutput = new EventEmitter<{ likeObject: any }>();
  use: any;
  commentText: string;
  liked: boolean;

  constructor(
    private postsService: PostsService,
    private commentService: CommentsService,
    private route: Router
  ) {}

  like(id: number) {
    this.postsService.likePost(id).subscribe((data) => {
      console.log(data);
      if (data) {
        this.liked = true;
        this.post.postLikes.push({
          data,
        });
        this.testOutput.emit({ likeObject: data });
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
          [
            this.userData.firstName,
            this.userData.lastName,
            this.userData.profilePhoto,
            this.userData.idAccount,
          ],
        ];
        this.post.comments.push(data);
        this.commentText = null;
      });
  }

  goToDescription(id: number): void {
    this.route.navigate(['/description', id]);
  }

  ngOnInit(): void {
    //  setTimeout(()=>console.log(this.userData),2000) ;
  }
}
