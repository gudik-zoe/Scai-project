import { Injectable, ɵisListLikeIterable } from '@angular/core';

import { CommentStmt } from '@angular/compiler';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  close = new Subject<boolean>();
  sharedPosts = [];
  signedIn = [];
  constructor(
    private accountService: AccountService,
    private auth: AuthService,
    private storage: StorageService,
    private http: HttpClient
  ) {}

  like(id): void {
    if (this.posts[id].likePressed) {
      this.posts[id].likes = this.posts[id].likes - 1;
      this.posts[id].likePressed = false;
    } else {
      this.posts[id].likes = this.posts[id].likes + 1;
      this.posts[id].likePressed = true;
    }
  }

  getPosts() {
    return this.http.get('http://localhost:8080/posts');
  }

  getPostsByAccountId() {
    return this.http.get(
      'http://localhost:8080/posts/accountId/' + this.accountService.getId()
    );
  }

  getPostLikes(postId) {
    return this.http.get(
      'http://localhost:8080/postLikes/likesNumber/' + postId
    );
  }

  getPostLikers(postId) {
    return this.http.get('http://localhost:8080/postLikes/likers/' + postId);
  }

  likePost(postId) {
    return this.http.post(
      'http://localhost:8080/postLikes/' +
        this.accountService.getId() +
        '/' +
        postId,
      {}
    );
  }

  addPost() {
    return this.http.post(
      'http://localhost:8080/posts/' + this.accountService.getId(),
      {
        text: 'my post from vsc',
        image: 'this is the image',
        description: "no description it's just a prova",
      }
    );
  }

  deletePost(postId) {
    return this.http.delete('http://localhost:8080/posts/' + postId);
  }

  commentLike(postId: number, commentId: number): void {
    if (this.posts[postId].comments[commentId].likePressed) {
      this.posts[postId].comments[commentId].likes =
        this.posts[postId].comments[commentId].likes - 1;
      this.posts[postId].comments[commentId].likePressed = false;
    } else {
      this.posts[postId].comments[commentId].likes =
        this.posts[postId].comments[commentId].likes + 1;
      this.posts[postId].comments[commentId].likePressed = true;
    }
  }

  removeComment(postId: number, commentId: number): void {
    this.posts[postId].comments = this.posts[postId].comments.filter(
      (item) => item.commentId !== commentId
    );
  }

  comment(id: number, data: string) {
    // if (data === null || data === '') {
    //   return false;
    // } else {
    //   this.posts[id].comments.push({
    //     name: this.storage.getName(),
    //     image: this.storage.getImage(),
    //     comment: data,
    //     likePressed: false,
    //     editMode: false,
    //     likes: 0,
    //     commentId: this.posts[id].comments.length,
    //     remove: true,
    //   });
    //   this.posts[id].commented = true;
    // }
  }

  showComment(id: number): void {
    this.posts[id].showComments = !this.posts[id].showComments;
  }

  edit(postId: number, commentId: number, editedComment: any): void {
    if (this.posts[postId].comments[commentId].editMode) {
      this.posts[postId].comments[commentId].comment = editedComment.value;
      this.posts[postId].comments[commentId].editMode = false;
    } else {
      this.posts[postId].comments[commentId].editMode = true;
    }
  }

  share(id: number): void {
    this.sharedPosts.push(this.posts[id]);
    this.posts[id].shared = true;
  }

  getName() {
    return this.storage.getName();
  }
  getLastName() {
    return this.storage.getLastName();
  }

  post(data: string, foto: string): void {
    this.posts.push({
      sharedBy: this.getName() + ' ' + this.getLastName(),
      text: data,
      shared: false,
      image: foto,
      description: '',
      likes: 0,
      likePressed: false,
      commented: false,
      comments: [],
      showComments: false,
      id: this.posts.length,
    });
  }
  posts = [
    {
      sharedBy: '',
      text: '',
      image:
        'https://avante.biz/wp-content/uploads/High-Res-Wallpaper/High-Res-Wallpaper-001.jpg',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et qui voluptatum sunt placeat provident. Laborum tempore quam corrupti assumenda odio maxime modi, quod a voluptatum veritatis! Corrupti dolores nam consequuntur.',
      likes: 20,
      shared: false,
      commented: false,
      likePressed: false,
      comments: [
        {
          commentId: 0,
          likePressed: false,
          editMode: false,
          name: 'natasha',
          remove: false,
          likes: 0,
          comment: ' nice photo',
          image:
            'https://image.shutterstock.com/image-vector/portrait-woman-head-girl-avatar-260nw-1287117751.jpg',
        },
        {
          name: 'steve',
          comment: ' che bella foto',
          commentId: 1,
          likePressed: false,
          editMode: false,
          remove: false,
          likes: 0,
          image:
            'data:image/png;base64,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',
        },
        {
          name: 'clarck',
          comment: ' es muy bonita',
          commentId: 2,
          editMode: false,
          likePressed: false,
          remove: false,
          likes: 0,
          image:
            'data:image/jpeg;base64,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',
        },
      ],
      showComments: false,
      id: 0,
    },
    {
      sharedBy: '',
      image:
        'https://previews.123rf.com/images/puhhha/puhhha1712/puhhha171200385/91511132-business-people-at-meeting-sharing-ideas-working-in-office-business-team-sitting-at-conference-table.jpg',
      description: '',
      likes: 1,
      shared: false,
      commented: false,
      likePressed: false,
      showComments: false,
      comments: [
        {
          name: 'mordik',
          commentId: 0,
          editMode: false,
          likePressed: false,
          remove: false,
          likes: 0,
          comment: "c'est très jolie",
          image:
            'https://thumbs.dreamstime.com/z/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg',
        },
      ],
      id: 1,
    },
    {
      sharedBy: '',
      image:
        'https://www.wallpapers13.com/wp-content/uploads/2015/11/League-Of-Legends-Champion-Annie-the-Dark-Child-and-Riven-the-exile-4k-ultra-HD-wallpapers-for-high-resolution-computer-and-laptop.jpeg',
      description: 'such a nice game join now',
      shared: false,
      likes: 30,
      commented: false,
      likePressed: false,
      comments: [],
      showComments: false,
      id: 2,
    },
  ];
}
