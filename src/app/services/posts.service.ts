import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { AccountBasicData } from '../models/accountBasicData';
import { NotificationService } from './notification.service';
import { Page } from '../models/page';
import { PageBasicData } from '../models/pageBasicData';

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
  homePagePosts: Post[] = [];
  allPosts: Post[];
  comment: Comment;
  post: Post;
  postsData = [];
  userBasicData: AccountBasicData;
  page: PageBasicData;
  accountPosts: Post[] = [];
  pagePosts: Post[] = [];
  confirmCreatePost = new Subject<Post>();
  constructor(
    private accountService: AccountService,
    private http: HttpClient,
    private notificationService: NotificationService // private pageService: PagesService
  ) {}

  async getPostOriginalUserData(post: Post) {
    const postData = await this.getPostByPostId(post.postOriginalId);
    if (postData && postData.postCreatorId) {
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
    } else if (postData && postData.pageCreatorId) {
      const checkIfPageExistInBasicDataArray = this.pages.find(
        (item) => item.idPage == postData.pageCreatorId
      );
      if (checkIfPageExistInBasicDataArray) {
        post.text = postData.text;
        post.image = postData.image;
        post.likesNumber = postData.postLikes.length;
        post.commentsNumber = postData.comments.length;
        post.originalPostDoneByPage = checkIfPageExistInBasicDataArray;
      } else {
        this.page = await this.getPageData(postData.pageCreatorId);
        post.text = postData.text;
        post.image = postData.image;
        post.likesNumber = postData.postLikes.length;
        post.commentsNumber = postData.comments.length;
        post.originalPostDoneByPage = this.page;
      }
    }
  }

  async getUserDetails(post: Post) {
    if (post && post.postCreatorId) {
      this.userBasicData = await this.accountService.getBasicAccountDetails(
        post.postCreatorId
      );
      post.doneBy = this.userBasicData;
    } else if (post.pageCreatorId) {
      post.doneByPage = await this.getPageData(post.pageCreatorId);
    }
    if (post.postedOn) {
      this.userBasicData = await this.accountService.getBasicAccountDetails(
        post.postedOn
      );
      post.postedOnData = this.userBasicData;
    }
    for (let comment of post.comments) {
      if (comment.commentCreatorId) {
        comment.doneBy = await this.accountService.getBasicAccountDetails(
          comment.commentCreatorId
        );
      } else if (comment.pageCreatorId) {
        comment.doneByPage = await this.getPageData(comment.pageCreatorId);
      }
      comment.date = this.notificationService.timeCalculation(comment.date);
      if (comment.commentLike.length > 0) {
        for (let like of comment.commentLike) {
          if (!like.pageCreatorId) {
            like.doneBy = await this.accountService.getBasicAccountDetails(
              like.commentLikeCreatorId
            );
          } else {
            like.doneByPage = await this.getPageData(like.pageCreatorId);
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
    post.date = this.notificationService.timeCalculation(post.date);
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
  pages: Page[] = [];
  getPageData(pageId: number) {
    return new Promise<PageBasicData>((resolve, reject) => {
      const check = this.pages.find((item: Page) => {
        item.idPage == pageId;
      });
      if (check) {
        resolve(check);
      } else {
        this.http
          .get(this.rootUrl + 'pages/getPage/' + pageId)
          .subscribe((data: Page) => {
            resolve(data);
          });
      }
    });
  }
}
