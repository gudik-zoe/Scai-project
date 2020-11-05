import { Injectable, ɵisListLikeIterable } from '@angular/core';

// import { CommentStmt } from '@angular/compiler';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';
import { EditPost } from '../models/editPostInt';
import { Account } from '../models/account';
import { PostLike } from '../models/postLike';
import { Comment } from '../models/comment';
import { AccountBasicData } from '../models/accountBasicData';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  rootUrl: string = environment.rootUrl;
  close = new Subject<any>();
  editPostComponent = new Subject<any>();
  sharePostComponent = new Subject<any>();
  errorSubject = new Subject<boolean>();
  alertComponent = new Subject<any>();
  dbPosts: Post[];
  comment: Comment;
  post: Post;
  postsData = [];
  userBasicData: AccountBasicData;
  accountPosts: Post[];
  date: number = new Date().getTime();

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  async getPostOriginalUserData(posts: Post[]) {
    for (let post of posts) {
      if (post.postOriginalId) {
        const postData = posts.find(
          (item) => item.idPost == post.postOriginalId
        );
        if (postData) {
          post.text = postData.text;
          post.image = postData.image;
          post.likesNumber = postData.postLikes.length;
          post.commentsNumber = postData.comments.length;
          post.originalPostDoneBy = postData.doneBy;
        } else {
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
      }
    }
  }

  async getUserDetails(posts: Post[]) {
    for (let post of posts) {
      this.userBasicData = await this.accountService.getBasicAccountDetails(
        post.postCreatorId
      );
      post.doneBy = this.userBasicData;
      for (let comment of post.comments) {
        this.userBasicData = await this.accountService.getBasicAccountDetails(
          comment.commentCreatorId
        );
        comment.doneBy = this.userBasicData;
      }
      for (let like of post.postLikes) {
        this.userBasicData = await this.accountService.getBasicAccountDetails(
          like.postLikeCreatorId
        );
        like.doneBy = this.userBasicData;
      }
    }
    this.getPostOriginalUserData(posts);
  }

  getPosts() {
    return new Promise<Post[]>((resolve) => {
      this.http.get(this.rootUrl + 'posts').subscribe((data: Post[]) => {
        this.dbPosts = data;
        this.getUserDetails(this.dbPosts);
        resolve(this.dbPosts);
      });
    });
  }

  getPostsByAccountId(id: number) {
    return new Promise<Post[]>((resolve) => {
      this.http
        .get(this.rootUrl + 'posts/accountId/' + id)
        .subscribe((data: Post[]) => {
          this.accountPosts = data;
          this.getUserDetails(this.accountPosts);
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
        .get(this.rootUrl + '/posts/postId/' + id)
        .subscribe((data: Post) => {
          this.post = data;
          // this.getPostDetail(this.post);
          resolve(this.post);
          reject('there is no post with this id');
        });
    });
  }

  getPostLikes(postId: number) {
    return new Promise<number>((resolve) => {
      this.http
        .get(this.rootUrl + 'postLikes/likesNumber/' + postId)
        .subscribe((data: number) => {
          resolve(data);
        });
    });
  }

  getPostLikers(postId: number) {
    return this.http.get(this.rootUrl + 'postLikes/likers/' + postId);
  }

  likePost(post: Post) {
    console.log(post);
    return this.http.post(
      this.rootUrl + 'postLikes/accountId/' + this.date,
      post
    );
  }

  addPost(post: Post) {
    return this.http.post(this.rootUrl + 'posts/accountId', post);
  }

  resharePost(idPost: number, extraText: string) {
    return this.http.post(
      this.rootUrl +
        'post/resharePost/' +
        idPost +
        '/' +
        this.date +
        '/' +
        extraText,
      {}
    );
  }

  updatePost(postId: number, newText: string, newImage: string) {
    return this.http.put(
      this.rootUrl +
        'posts/update/idAccount/' +
        postId +
        '/' +
        newText +
        '/' +
        newImage,
      {}
    );
  }

  deletePost(postId: number) {
    return this.http.delete(this.rootUrl + 'posts/' + postId);
  }
}
