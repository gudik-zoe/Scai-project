import { Injectable, ɵisListLikeIterable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  like(id) {
    this.posts[id].likes = this.posts[id].likes + 1;
  }
  disLike(id) {
    this.posts[id].likes = this.posts[id].likes - 1;
  }

  comment(id, data) {
    if (data === null || data === '') {
      return false;
    } else {
      this.posts[id].comments.push(data);
    }
  }

  showComment(id) {
    this.posts[id].showComments = !this.posts[id].showComments;
  }

  getPosts() {
    return this.posts;
  }

  share(id) {
    this.sharedPosts.push(this.posts[id]);
  }

  sharedPosts = [];

  posts = [
    {
      image:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
      description: 'such a nice photo',
      likes: 20,
      comments: ['first comment'],
      showComments: false,
      id: 0,
    },
    {
      image:
        'https://th.tvblog.it/V6HnVTZkLCDQ7iSQDveMVZFbWW4=/fit-in/655xorig/https%3A%2F%2Fmedia.tvblog.it%2F5%2F518%2Ffriends.jpg',
      description: '',
      likes: 1,
      showComments: false,
      comments: ['first comment', 'second comment'],
      id: 1,
    },
    {
      image:
        'https://estnn.com/wp-content/uploads/2020/01/league-of-legends-header-x.jpg',
      description: 'such a nice game join now',
      likes: 30,
      comments: [],
      showComments: false,
      id: 2,
    },
  ];

  constructor() {}
}
