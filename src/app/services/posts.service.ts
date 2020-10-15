import { Injectable, ɵisListLikeIterable } from '@angular/core';

// import { CommentStmt } from '@angular/compiler';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { PostsModel } from '../models/posts';
import { editPost } from '../models/editPostInt';
import { AccountModel } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  rootUrl: string = environment.rootUrl;
  close = new Subject<any>();
  editPostComponent = new Subject<any>();
  doneLoading = new Subject<boolean>();
  sendPost = new Subject<any>();
  dbPosts: PostsModel;
  accountPosts;
  basicData = [];

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  async getPostOriginalUserData(posts) {
    for (let post of posts) {
      if (post.sharedPostId) {
        const originalPostId = await this.accountService.getAccountIdByPostId(
          post.sharedPostId
        );
        const likesNumber = await this.getPostLikes(post.sharedPostId);
        post.likesNumber = likesNumber;

        const checkIfUserExistInThisBasicData = this.basicData.find(
          (item) => item.idAccount == originalPostId
        );
        if (!checkIfUserExistInThisBasicData) {
          const userBasicData = await this.accountService.getBasicAccountDetails2(
            originalPostId
          );
          this.basicData.push(userBasicData);
          post.originalPostDoneBy = userBasicData;
        } else {
          post.originalPostDoneBy = checkIfUserExistInThisBasicData;
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
        const data: any = await this.accountService.getBasicAccountDetails2(
          post.accountIdAccount
        );
        this.basicData.push(data);
        post.doneBy = data;
      } else {
        post.doneBy = checkIfUserExistInThisBasicData;
      }
    }
  }

  getPostsFullDetails(posts) {
    this.getPostOriginalUserData(posts);
    for (let post of posts) {
      this.getUserDetails(posts);
      this.getUserDetails(post.comments);
      this.getUserDetails(post.postLikes);
    }
  }

  getPosts() {
    return new Promise<PostsModel>((resolve) => {
      this.http.get(this.rootUrl + 'posts').subscribe((data: PostsModel) => {
        this.dbPosts = data;
        this.getPostsFullDetails(this.dbPosts);
        resolve(this.dbPosts);
      });
    });
  }

  getPostsByAccountId(id) {
    return new Promise<PostsModel>((resolve) => {
      this.http
        .get(this.rootUrl + 'posts/accountId/' + id)
        .subscribe((data) => {
          this.accountPosts = data;
          this.getPostsFullDetails(this.accountPosts);
          resolve(this.accountPosts);
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

  likePost(postId) {
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
