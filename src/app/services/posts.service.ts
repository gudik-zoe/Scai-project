import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { AccountBasicData } from '../models/accountBasicData';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  rootUrl: string = environment.rootUrl;
  close = new Subject<any>();
  editPostComponent = new Subject<any>();
  sharePostComponent = new Subject<any>();
  errorSubject = new Subject<boolean>();
  deletePostSubject = new Subject<any>();
  alertComponent = new Subject<any>();
  confirmPostDeleting = new Subject<any>();
  leavePostComponent = new Subject<any>();
  homePagePosts: Post[];
  allPosts: Post[];
  comment: Comment;
  post: Post;
  postsData = [];
  userBasicData: AccountBasicData;
  accountPosts: Post[];
  confirmCreatePost = new Subject<Post>();
  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  async getPostOriginalUserData(post: Post) {
    // const postData = this.homePagePosts.find(
    //   (item) => item.idPost == post.postOriginalId
    // );
    // if (postData) {
    //   post.text = postData.text;
    //   post.image = postData.image;
    //   post.likesNumber = postData.postLikes.length;
    //   post.commentsNumber = postData.comments.length;
    //   post.originalPostDoneBy = postData.doneBy;
    // } else {
    const postData = await this.getPostByPostId(post.postOriginalId);
    if (postData) {
      const checkIfUserExistInBasicDataArray = this.accountService.accountBasicData.find(
        (item) => item.idAccount == postData.postCreatorId
      );
      if (checkIfUserExistInBasicDataArray) {
        post.text = postData.text;
        post.image = postData.image;
        post.likesNumber = postData.postLikes.length;
        post.commentsNumber = postData.comments.length;
        post.originalPostDoneBy = checkIfUserExistInBasicDataArray;
      } else {
        this.userBasicData = await this.accountService.getBasicAccountDetails(
          postData.postCreatorId
        );
        post.text = postData.text;
        post.image = postData.image;
        post.likesNumber = postData.postLikes.length;
        post.commentsNumber = postData.comments.length;
        post.originalPostDoneBy = this.userBasicData;
      }
    }
  }

  async getUserDetails(post: Post) {
    if (post) {
      this.userBasicData = await this.accountService.getBasicAccountDetails(
        post.postCreatorId
      );
      post.doneBy = this.userBasicData;
      if (post.postedOn) {
        this.userBasicData = await this.accountService.getBasicAccountDetails(
          post.postedOn
        );
        post.postedOnData = this.userBasicData;
      }
      for (let comment of post.comments) {
        this.userBasicData = await this.accountService.getBasicAccountDetails(
          comment.commentCreatorId
        );
        comment.doneBy = this.userBasicData;
        if (comment.date) {
          comment.date = await this.notificationService.timeCalculation(
            comment.date
          );
        }
        if (comment.commentLike.length > 0) {
          for (let like of comment.commentLike) {
            like.doneBy = await this.accountService.getBasicAccountDetails(
              like.commentLikeCreatorId
            );
          }
        }
      }
      for (let like of post.postLikes) {
        this.userBasicData = await this.accountService.getBasicAccountDetails(
          like.postLikeCreatorId
        );
        like.doneBy = this.userBasicData;
      }
      post.date = await this.notificationService.timeCalculation(post.date);
    }
  }

  // async getDate() {
  //   this.post.date = await this.notificationService.timeCalculation(this.post);
  //   for (let comment of this.post.comments) {
  //     if (comment.date) {
  //       comment.date = await this.notificationService.timeCalculation(
  //         comment.date
  //       );
  //     }
  //   }
  // }
  getHomePagePosts() {
    return new Promise<Post[]>((resolve) => {
      this.http
        .get(this.rootUrl + 'homePage/posts')
        .subscribe((data: Post[]) => {
          this.homePagePosts = data;
          this.homePagePosts.sort((a, b) => b.date.localeCompare(a.date));
          for (let post of this.homePagePosts) {
            this.getUserDetails(post);
            if (post.postOriginalId) {
              this.getPostOriginalUserData(post);
            }
          }

          resolve(this.homePagePosts);
        });
    });
  }

  // getAllPosts() {
  //   return new Promise<Post[]>((resolve) => {
  //     this.http
  //       .get(this.rootUrl + 'posts/allPosts')
  //       .subscribe((data: Post[]) => {
  //         this.allPosts = data;
  //         this.getUserDetails(this.allPosts);
  //         resolve(this.allPosts);
  //       });
  //   });
  // }

  getPostsByAccountId(id: number) {
    return new Promise<Post[]>((resolve) => {
      this.http
        .get(this.rootUrl + 'posts/accountId/' + id)
        .subscribe((data: Post[]) => {
          this.accountPosts = data;
          for (let post of this.accountPosts) {
            this.getUserDetails(post);
            if (post.postOriginalId) {
              this.getPostOriginalUserData(post);
            }
          }
          resolve(this.accountPosts);
        });
    });
  }
  async getPostDetail(post: Post) {
    const userData = await this.accountService.getBasicAccountDetails(
      post.postCreatorId
    );
    post.doneBy = userData;
  }

  getPostByPostId(id: number) {
    return new Promise<Post>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'posts/postId/' + id)
        .subscribe((data: Post) => {
          this.post = data;
          if (this.post) {
            this.getUserDetails(this.post);
            if (this.post.postOriginalId) {
              this.getPostOriginalUserData(this.post);
            }
          }
          resolve(this.post);
          reject('there is no post with this id');
        });
    });
  }

  // getPostLikes(postId: number) {
  //   return new Promise<number>((resolve) => {
  //     this.http
  //       .get(this.rootUrl + 'postLikes/likesNumber/' + postId)
  //       .subscribe((data: number) => {
  //         resolve(data);
  //       });
  //   });
  // }

  // getPostLikers(postId: number) {
  //   return this.http.get(this.rootUrl + 'postLikes/likers/' + postId);
  // }

  likePost(postId: number) {
    return this.http.post(this.rootUrl + 'postLikes/accountId/' + postId, {});
  }

  addPost(formData: FormData) {
    return this.http.post(this.rootUrl + 'posts/accountId/', formData);
  }

  postOnWall(postedOn: number, formData: FormData) {
    return this.http.post(
      this.rootUrl + 'posts/postOnWall/' + postedOn,
      formData
    );
  }

  resharePost(idPost: number, formData: FormData) {
    return this.http.post(
      this.rootUrl + 'post/resharePost/' + idPost,
      formData
    );
  }

  updatePost(postId: number, formData: FormData, postWithImage: boolean) {
    return this.http.put(
      this.rootUrl + 'posts/update/idAccount/' + postId + '/' + postWithImage,
      formData
    );
  }

  deletePost(postId: number) {
    return this.http.delete(this.rootUrl + 'posts/' + postId);
  }
}
