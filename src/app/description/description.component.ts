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

  privatePost = {
    text: 'this is a private post',
    image: '',
  };

  async getPost() {
    const postFoundInHomePagePosts = this.postsService.homePagePosts.find(
      (item) => item.idPost == this.id
    );
    const postFoundInAccounPosts = this.postsService.accountPosts.find(
      (item) => item.idPost == this.id
    );

    if (postFoundInHomePagePosts) {
      this.post = postFoundInHomePagePosts;
    } else if (!postFoundInHomePagePosts && postFoundInAccounPosts) {
      this.post = postFoundInAccounPosts;
    } else {
      this.post = await this.postsService.getPostByPostId(this.id);
      if (
        this.post.status == 2 &&
        this.post.postCreatorId != this.accountService.userData.idAccount
      ) {
        this.post.text = 'this is a private post!!';
        this.post.image = null;
        this.post.comments = [];
        this.post.postLikes = [];
      }
    }
  }

  ngOnInit() {
    this.aroute.params.subscribe((data) => {
      this.id = parseInt(data.id);
      this.getPost();
    });
  }
}
