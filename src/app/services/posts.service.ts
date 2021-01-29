import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { AccountBasicData } from '../models/accountBasicData';
import { NotificationService } from './notification.service';
import { Page } from '../models/page';
import { PageBasicData } from '../models/pageBasicData';
import { PagesService } from './pages.service';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  rootUrl: string = environment.rootUrl;
  alertComponent = new Subject<any>();
  leavePostComponent = new Subject<any>();
  homePagePosts: Post[] = [];
  post: Post;
  userBasicData: AccountBasicData;
  page: PageBasicData;
  accountPosts: Post[] = [];
  pagePosts: Post[] = [];
  confirmCreatePost = new Subject<Post>();
  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private utilityService: UtilityService
  ) {}
  thePost: Post;

  async getPostOriginalUserData(post: Post) {
    const originalPost = await this.getPostByPostId(post.postOriginalId);
    if (originalPost && originalPost.postCreatorId) {
      post.text = originalPost.text;
      post.image = originalPost.image;
      post.likesNumber = originalPost.postLikes.length;
      post.commentsNumber = originalPost.comments.length;
      post.originalPostDoneBy = await this.accountService.getBasicAccountDetails(
        originalPost.postCreatorId
      );
    } else {
      post.text = originalPost.text;
      post.image = originalPost.image;
      post.likesNumber = originalPost.postLikes.length;
      post.commentsNumber = originalPost.comments.length;
      post.originalPostDoneByPage = await this.utilityService.getPageData(
        originalPost.pageCreatorId
      );
    }
    // post.originalPostDoneBy = await this.accountService.getBasicAccountDetails(post.o)
    // if (postData && postData.postCreatorId) {
    //   const checkIfUserExistInBasicDataArray = this.accountService.accountBasicData.find(
    //     (item) => item.idAccount == postData.postCreatorId
    //   );
    //   if (checkIfUserExistInBasicDataArray) {
    //     post.text = postData.text;
    //     post.image = postData.image;
    //     post.likesNumber = postData.postLikes.length;
    //     post.commentsNumber = postData.comments.length;
    //     post.originalPostDoneBy = checkIfUserExistInBasicDataArray;
    //   } else {
    //     this.userBasicData = await this.accountService.getBasicAccountDetails(
    //       postData.postCreatorId
    //     );
    //     post.text = postData.text;
    //     post.image = postData.image;
    //     post.likesNumber = postData.postLikes.length;
    //     post.commentsNumber = postData.comments.length;
    //     post.originalPostDoneBy = this.userBasicData;
    //   }
    // } else if (postData && postData.pageCreatorId) {
    //   const checkIfPageExistInBasicDataArray = this.pages.find(
    //     (item) => item.idPage == postData.pageCreatorId
    //   );
    //   if (checkIfPageExistInBasicDataArray) {
    //     post.text = postData.text;
    //     post.image = postData.image;
    //     post.likesNumber = postData.postLikes.length;
    //     post.commentsNumber = postData.comments.length;
    //     post.originalPostDoneByPage = checkIfPageExistInBasicDataArray;
    //   } else {
    //     this.page = await this.getPageData(postData.pageCreatorId);
    //     post.text = postData.text;
    //     post.image = postData.image;
    //     post.likesNumber = postData.postLikes.length;
    //     post.commentsNumber = postData.comments.length;
    //     post.originalPostDoneByPage = this.page;
    //   }
    // }
  }

  async getUserDetails(post: Post) {
    post.date = this.notificationService.timeCalculation(post.date);
    if (post.postCreatorId) {
      this.userBasicData = await this.accountService.getBasicAccountDetails(
        post.postCreatorId
      );
      post.doneBy = this.userBasicData;
    } else if (post.pageCreatorId) {
      post.doneByPage = await this.utilityService.getPageData(
        post.pageCreatorId
      );
    }
    if (post.postedOn) {
      this.userBasicData = await this.accountService.getBasicAccountDetails(
        post.postedOn
      );
      post.postedOnData = this.userBasicData;
    }
    for (let comment of post.comments) {
      if (!comment.date.includes('ago')) {
        comment.date = this.notificationService.timeCalculation(comment.date);
      }
      if (comment.commentCreatorId) {
        comment.doneBy = await this.accountService.getBasicAccountDetails(
          comment.commentCreatorId
        );
      } else if (comment.pageCreatorId) {
        comment.doneByPage = await this.utilityService.getPageData(
          comment.pageCreatorId
        );
      }
      if (comment.commentLike.length > 0) {
        for (let like of comment.commentLike) {
          if (!like.pageCreatorId) {
            like.doneBy = await this.accountService.getBasicAccountDetails(
              like.commentLikeCreatorId
            );
          } else {
            like.doneByPage = await this.utilityService.getPageData(
              like.pageCreatorId
            );
          }
        }
      }
    }
    for (let like of post.postLikes) {
      this.userBasicData = await this.accountService.getBasicAccountDetails(
        like.postLikeCreatorId
      );
      like.doneBy = this.userBasicData;
    }
  }

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

  getPostsByAccountId(id: number) {
    return new Promise<Post[]>((resolve, reject) => {
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
          reject(null);
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
      let post = this.homePagePosts.find((item) => item.idPost == id);
      if (post) {
        resolve(post);
      } else {
        this.http
          .get(this.rootUrl + 'posts/postId/' + id)
          .subscribe((data: Post) => {
            post = data;
            if (post) {
              this.getUserDetails(post);
              // if (this.post.postOriginalId) {
              //   this.getPostOriginalUserData(this.post);
              // }
            }
            resolve(post);
            reject('there is no post with this id');
          });
      }
    });
  }

  likePost(postId: number) {
    return this.http.post(this.rootUrl + 'postLikes/accountId/' + postId, {});
  }

  addPost(formData: FormData) {
    return this.http.post(this.rootUrl + 'posts/accountId', formData);
  }

  postOnWall(postedOn: number, formData: FormData) {
    return this.http.post(
      this.rootUrl + 'posts/postOnWall/' + postedOn,
      formData
    );
  }

  resharePost(post: Post, formData: FormData): Promise<Post> {
    return new Promise<Post>((resolve, reject) => {
      this.http
        .post(this.rootUrl + 'post/resharePost/' + post.idPost, formData)
        .subscribe(
          (data: Post) => {
            (data.postLikes = []), (data.comments = []);
            data.image = post.image;
            data.text = post.text;
            data.doneBy = { ...this.accountService.userData };
            data.date = this.notificationService.timeCalculation(data.date);
            if (post.postCreatorId) {
              data.originalPostDoneBy = { ...post.doneBy };
            } else {
              data.originalPostDoneByPage = { ...post.doneByPage };
            }
            resolve(data);
          },
          (error) => {
            reject(error.error.message);
          }
        );
    });
  }

  updatePost(postId: number, formData: FormData, postWithImage: boolean) {
    return new Promise<Post>((resolve, reject) => {
      this.http
        .put(
          this.rootUrl +
            'posts/update/idAccount/' +
            postId +
            '/' +
            postWithImage,
          formData
        )
        .subscribe(
          (data: Post) => {
            resolve(data);
          },
          (error) => {
            reject(error.error.message);
          }
        );
    });
  }

  getPagePosts(pageId: number) {
    return new Promise<Post[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + '/page/posts/' + pageId)
        .subscribe((data: Post[]) => {
          this.pagePosts = data;
          for (let post of this.pagePosts) {
            this.getUserDetails(post);
          }
          resolve(this.pagePosts);
          reject('unknown error occured');
        });
    });
  }

  deletePost(postId: number) {
    return this.http.delete(this.rootUrl + 'posts/' + postId);
  }
}
