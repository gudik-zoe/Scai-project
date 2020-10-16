import { Injectable, ɵisListLikeIterable } from '@angular/core';

// import { CommentStmt } from '@angular/compiler';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { editPost } from '../models/editPostInt';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  rootUrl: string = environment.rootUrl;
  close = new Subject<any>();
  editPostComponent = new Subject<any>();
  dbPosts: Post;
  accountPosts;
  postDetails: Post;
  basicData = [];

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  async getPostOriginalUserData(posts) {
    for (let post of posts) {
      if (post.postOriginalOwnerId) {
        const postData = posts.find(
          (item) => item.idPosts == post.postOriginalId
        );
        if (postData) {
          post.likesNumber = postData.postLikes.length;
          post.commentsNumber = postData.comments.length;
          post.originalPostDoneBy = postData.doneBy;
        } else {
          const newPostData = await this.getPostByPostId(post.postOriginalId);
        }
      }
    }
  }

  async getUserDetails(posts: any) {
    for (let post of posts) {
      const checkIfUserExistInThisBasicData = this.basicData.find(
        (item) => item.idAccount == post.accountIdAccount
      );

      if (!checkIfUserExistInThisBasicData) {
        const data: any = await this.accountService.getBasicAccountDetails(
          post.accountIdAccount
        );
        this.basicData.push(data);
        post.doneBy = data;
      } else {
        post.doneBy = checkIfUserExistInThisBasicData;
      }
    }
    this.getPostOriginalUserData(posts);
  }

  getPostsFullDetails(posts) {
    for (let post of posts) {
      this.getUserDetails(posts);
      this.getUserDetails(post.comments);
      this.getUserDetails(post.postLikes);
    }
  }

  getPosts() {
    return new Promise<Post>((resolve) => {
      this.http.get(this.rootUrl + 'posts').subscribe((data: Post) => {
        this.dbPosts = data;
        this.getPostsFullDetails(this.dbPosts);
        resolve(this.dbPosts);
      });
    });
  }

  getPostsByAccountId(id) {
    return new Promise<Post>((resolve) => {
      this.http
        .get(this.rootUrl + 'posts/accountId/' + id)
        .subscribe((data) => {
          this.accountPosts = data;
          this.getPostsFullDetails(this.accountPosts);
          resolve(this.accountPosts);
        });
    });
  }

  getPostByPostId(id: number) {
    return new Promise((resolve) => {
      this.http
        .get(this.rootUrl + '/posts/postId/' + id)
        .subscribe((data: Post) => {
          console.log(data);
          resolve(data);
        });
    });
  }

  getPostLikes(postId) {
    return new Promise((resolve) => {
      this.http
        .get(this.rootUrl + 'postLikes/likesNumber/' + postId)
        .subscribe((data) => {
          resolve(data);
        });
    });
  }

  getPostLikers(postId) {
    return this.http.get(this.rootUrl + 'postLikes/likers/' + postId);
  }

  likePost(postId: number) {
    return this.http.post(
      this.rootUrl + 'postLikes/' + this.accountService.getId() + '/' + postId,
      {}
    );
  }

  addPost(post) {
    return this.http.post(
      this.rootUrl + 'posts/' + this.accountService.getId(),
      post
    );
  }

  updatePost(post) {
    return this.http.put(
      this.rootUrl + 'posts/update/' + this.accountService.getId(),
      post
    );
  }

  deletePost(postId: number) {
    return this.http.delete(this.rootUrl + 'posts/' + postId);
  }
}
// const sharedPosts = []
// posts.forEach(post => {
//   if(post.sharedPostId) {
//     sharedPosts.push(post)
//   }
//   return sharedPosts
// });

// sharedPosts.map(post => this.basicData.find(
//          (post) => post.idAccount == originalPostDoneBy
//        );)
