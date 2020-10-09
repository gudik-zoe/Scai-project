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
import { EditPostModule } from '../edit-post/edit-post.module';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  rootUrl: string = environment.rootUrl;
  close = new Subject<any>();
  editPostComponent = new Subject<editPost>();
  doneLoading = new Subject<boolean>();
  sendPost = new Subject<any>();
  dbPosts: PostsModel;
  accountPosts;

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  getPosts() {
    return this.http.get(this.rootUrl + 'posts');
  }

  // getPosts2() {
  //   this.getPosts().subscribe((data) => {
  //     this.dbPosts = data;
  //     for (let i of this.dbPosts) {
  //       this.accountService.getBasicAccountDetails(i.accountIdAccount);
  //     }
  //   });
  // }

  getPostsDetails(posts) {
    for (let i of posts) {
      this.accountService
        .getBasicAccountDetails(i.accountIdAccount)
        .subscribe((u) => {
          i.sharedBy = u;
        });

      for (let j of i.comments) {
        this.accountService
          .getBasicAccountDetails(j.accountIdAccount)
          .subscribe((c) => {
            j.commentedBy = c;
          });
      }
      for (let k of i.postLikes) {
        this.accountService
          .getBasicAccountDetails(k.accountIdAccount)
          .subscribe((l) => {
            k.likedBy = l;
          });
      }
    }
  }

  getPosts2() {
    return new Promise<PostsModel>((resolve) => {
      this.getPosts().subscribe((data: PostsModel) => {
        this.dbPosts = data;
        this.getPostsDetails(this.dbPosts);
        resolve(this.dbPosts);
      });
    });
  }

  getMyPosts() {
    return this.http.get(
      this.rootUrl + 'posts/accountId/' + this.accountService.getId()
    );
  }

  getPostsByAccountId(id) {
    return new Promise<PostsModel>((resolve) => {
      this.http
        .get(this.rootUrl + 'posts/accountId/' + id)
        .subscribe((data) => {
          this.accountPosts = data;
          this.getPostsDetails(this.accountPosts);
          resolve(this.accountPosts);
        });
    });
  }

  getPostLikes(postId) {
    return this.http.get(this.rootUrl + 'postLikes/likesNumber/' + postId);
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
      this.rootUrl + 'posts/' + this.accountService.getId(),
      post
    );
  }

  deletePost(postId: number) {
    return this.http.delete(this.rootUrl + 'posts/' + postId);
  }
}
