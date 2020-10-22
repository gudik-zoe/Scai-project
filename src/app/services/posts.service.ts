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
  dbPosts: Post[];
  comment: Comment;
  basicData = [];
  ù;
  postsData = [];
  userBasicData: AccountBasicData;
  accountPosts: Post[];

  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  async getPostOriginalUserData(posts: Post[]) {
    for (let post of posts) {
      if (post.postOriginalId) {
        const postOriginalId = post.postOriginalId;
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
            const checkIfUserExistInThisBasicData = this.basicData.find(
              (item) => item.idAccount == postData.postCreatorId
            );
            if (checkIfUserExistInThisBasicData) {
              post.text = postData.text;
              post.image = postData.image;
              post.likesNumber = postData.postLikes.length;
              post.commentsNumber = postData.comments.length;
              post.originalPostDoneBy = checkIfUserExistInThisBasicData;
            } else {
              this.userBasicData = await this.accountService.getBasicAccountDetails(
                postData.postCreatorId
              );
              this.basicData.push(this.userBasicData);
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
      const checkIfUserExistInThisBasicData = this.basicData.find(
        (item) => item.idAccount == post.postCreatorId
      );
      if (!checkIfUserExistInThisBasicData) {
        this.userBasicData = await this.accountService.getBasicAccountDetails(
          post.postCreatorId
        );
        this.basicData.push(this.userBasicData);
        post.doneBy = this.userBasicData;
      } else {
        post.doneBy = checkIfUserExistInThisBasicData;
      }
      for (let comment of post.comments) {
        const checkIfUserExistInThisBasicData = this.basicData.find(
          (item) => item.idAccount == comment.commentCreatorId
        );
        if (!checkIfUserExistInThisBasicData) {
          this.userBasicData = await this.accountService.getBasicAccountDetails(
            comment.commentCreatorId
          );
          this.basicData.push(this.userBasicData);
          comment.doneBy = this.userBasicData;
        } else {
          comment.doneBy = checkIfUserExistInThisBasicData;
        }
      }
      for (let like of post.postLikes) {
        const checkIfUserExistInThisBasicData = this.basicData.find(
          (item) => item.idAccount == like.postLikeCreatorId
        );
        if (!checkIfUserExistInThisBasicData) {
          this.userBasicData = await this.accountService.getBasicAccountDetails(
            like.postLikeCreatorId
          );
          this.basicData.push(this.userBasicData);
          like.doneBy = this.userBasicData;
        } else {
          like.doneBy = checkIfUserExistInThisBasicData;
        }
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

  getPostByPostId(id: number) {
    return new Promise<Post>((resolve, reject) => {
      this.http
        .get(this.rootUrl + '/posts/postId/' + id)
        .subscribe((data: Post) => {
          resolve(data);
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

  updatePost(post: Post) {
    return this.http.put(
      this.rootUrl + 'posts/update/' + this.accountService.getId(),
      post
    );
  }

  deletePost(postId: number) {
    return this.http.delete(this.rootUrl + 'posts/' + postId);
  }
}

// posts.forEach(async (post: Post) => {
//   const checkIfUserExistInThisBasicData = this.basicData.find(
//     (item) => item.idAccount == post.postCreatorId
//   );
//   if (!checkIfUserExistInThisBasicData) {
//     const data = await this.accountService.getBasicAccountDetails(
//       post.postCreatorId
//     );
//     this.basicData.push(data);
//     post.doneBy = data;
//   } else {
//     post.doneBy = checkIfUserExistInThisBasicData;
//   }

//   post.comments.forEach(async (comment: Comment) => {
//     const checkIfUserExistInThisBasicData = this.basicData.find(
//       (item) => item.idAccount == comment.commentCreatorId
//     );
//     if (!checkIfUserExistInThisBasicData) {
//       const data = await this.accountService.getBasicAccountDetails(
//         comment.commentCreatorId
//       );
//       this.basicData.push(data);
//       comment.doneBy = data;
//     } else {
//       comment.doneBy = checkIfUserExistInThisBasicData;
//     }
//   });
//   post.postLikes.forEach(async (like: PostLike) => {
//     const checkIfUserExistInThisBasicData = this.basicData.find(
//       (item) => item.idAccount == like.postLikeCreatorId
//     );
//     if (!checkIfUserExistInThisBasicData) {
//       const data = await this.accountService.getBasicAccountDetails(
//         like.postLikeCreatorId
//       );
//       this.basicData.push(data);
//       like.doneBy = data;
//     } else {
//       like.doneBy = checkIfUserExistInThisBasicData;
//     }
//   });
// });
