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

  async getPosts() {
    const postFoundInHomePagePosts = this.postsService.homePagePosts.find(
      (item) => item.idPost == this.id
    );
    const postFoundInAccounPosts = this.postsService.accountPosts.find(
      (item) => item.idPost == this.id
    );

    if (postFoundInHomePagePosts) {
      this.post = postFoundInHomePagePosts;
      this.post;
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
      // if (this.postsService.homePagePosts) {
      //   const foundInHomePage = this.postsService.homePagePosts.find(
      //     (item) => item.idPost == this.id
      //   );
      //   if (foundInHomePage) {
      //     this.post = foundInHomePage;
      //     console.log('found in homepagePosts');
      //     return this.post;
      //   } else if (!foundInHomePage && this.postsService.accountPosts) {
      //     console.log("couldn't find it in home page posts");
      //     const foundInAccountPosts = this.postsService.accountPosts.find(
      //       (item) => item.idPost == this.id
      //     );
      //     if (foundInAccountPosts) {
      //       console.log('found in accountPosts');
      //       this.post = foundInAccountPosts;
      //       return this.post;
      //     } else {
      //       console.log(
      //         "couldn't find it in account posts going to do the chiamata"
      //       );
      //       this.post = await this.postsService.getPostByPostId(this.id);
      //       if (
      //         this.post.status == 2 &&
      //         this.post.postCreatorId != this.accountService.userData.idAccount
      //       ) {
      //         console.log('weiila');
      //         this.post.text = 'this is a private post!!';
      //         this.post.image = null;
      //         this.post.comments = [];
      //         this.post.postLikes = [];
      //       } else {
      //         console.log('here');
      //         return this.post;
      //       }
      //     }
      //   }
      // }
    }
  }

  ngOnInit() {
    this.aroute.params.subscribe((data) => {
      this.id = parseInt(data.id);
      this.getPosts();
    });
  }
}
