import { Injectable, ɵisListLikeIterable } from '@angular/core';

// import { CommentStmt } from '@angular/compiler';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
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
  userBasicData: AccountBasicData;
  accountPosts: Post[];

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  async getPostOriginalUserData(posts) {
    for (let post of posts) {
      if (post.postOriginalId) {
        const postData = posts.find(
          (item) => item.idPost == post.postOriginalId
        );
        if (postData) {
          post = { ...postData };
          post.originalPostDoneBy = postData.doneBy;
        } else {
          const postData = await this.getPostByPostId(post.postOriginalId);
          post = postData;
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
        // console.log(this.dbPosts);
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
