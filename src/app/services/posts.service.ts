import { Injectable, ɵisListLikeIterable } from '@angular/core';

// import { CommentStmt } from '@angular/compiler';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  rootUrl: string = environment.rootUrl;
  close = new Subject<boolean>();
  dbPosts;
  userDetail = [];

  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpClient
  ) { }

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

  getPosts2() {
    return new Promise((resolve) => {
      this.getPosts().subscribe((data) => {
        this.dbPosts = data;
        for (let i of this.dbPosts) {
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
        // console.log(this.dbPosts);
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
    return this.http.get(this.rootUrl + 'posts/accountId/' + id)
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

  addPost(text, image?, description?) {
    return this.http.post(
      this.rootUrl + 'posts/' + this.accountService.getId(),
      {
        text,
        image,
        description,
      }
    );
  }

  deletePost(postId) {
    return this.http.delete(this.rootUrl + 'posts/' + postId);
  }
}