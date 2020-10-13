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
  basicData = [];

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  async function(a: any) {
    for (let i of a) {
      const b = this.basicData.find(
        (item) => item.idAccount == i.accountIdAccount
      );
      if (!b) {
        const data: any = await this.accountService.getBasicAccountDetails2(
          i.accountIdAccount
        );
        this.basicData.push(data);
        i.doneBy = data;
      } else {
        i.doneBy = b;
      }
    }
  }

  getPostsFullDetails(posts) {
    for (let i of posts) {
      // this.getPostLikers(i.idPosts).subscribe((data: any) => {
      //   for (let j of data) {
      //     if (j == this.accountService.getId()) {
      //       i.currentUserLikedThisPost = true;
      //     } else {
      //       i.currentUserLikedThisPost = false;
      //     }
      //   }
      // });
      this.function(posts);
      this.function(i.comments);
      this.function(i.postLikes);
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
