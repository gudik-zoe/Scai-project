import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { CommentLike } from '../models/commentLike';
import { AccountService } from '../services/account.service';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
})
export class DescriptionComponent implements OnInit {
  imgUrl: string = environment.rootUrl + 'files/';
  dbPosts: Post[];
  post: Post;
  id: number;
  postLikersList: object;

  constructor(
    private postsService: PostsService,
    private aroute: ActivatedRoute,
    private accountService: AccountService
  ) {}

  async getPosts() {
    this.post = await this.postsService.getPostByPostId(this.id);
    return new Promise(async (resolve) => {
      for (let comment of this.post.comments) {
        if (comment.commentLike.length > 0) {
          for (let like of comment.commentLike) {
            like.doneBy = await this.accountService.getBasicAccountDetails(
              like.commentLikeCreatorId
            );
          }
        }
      }
      resolve(this.post);
    });
  }

  ngOnInit() {
    this.aroute.params.subscribe((data) => {
      this.id = parseInt(data.id);
      this.getPosts();
    });
  }
}
