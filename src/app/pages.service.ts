import { Injectable } from '@angular/core';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(private postService: PostsService) {}

  like(id: number, text: string) {
    if (!this.pages[id].liked) {
      this.postService.posts.push({
        ...this.pages[id].post,
        id: this.postService.posts.length,
      });
      this.pages[id].liked = true;
    } else {
      this.postService.posts = this.postService.posts.filter(
        (item) => item.text !== text
      );
      this.pages[id].liked = false;
    }
  }

  pages = [
    {
      image: 'https://live.staticflickr.com/2878/33038321363_c60aabd9e9_b.jpg',
      likes: 300,
      name: 'Tomb Raider: UnderWorld',
      liked: false,
      post: {
        name: 'Tomb Raider , UnderWorld',
        sharedBy: null,
        commented: false,
        shared: false,
        text: 'Explore the new  Tomb Raider ',
        sharedByPhoto:
          'https://live.staticflickr.com/2878/33038321363_c60aabd9e9_b.jpg',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRvc3Vr5FDZy4jKr52_rtP6ZdYM5g0bKEtqyw&usqp=CAU',
        description: '',
        likes: 100,
        likePressed: false,
        comments: [
          {
            commentId: 2,
            likePressed: false,
            editMode: false,
            name: 'Romanov',
            remove: false,
            likes: 0,
            comment: 'woow',
            image:
              'https://image.shutterstock.com/image-vector/portrait-woman-head-girl-avatar-260nw-1287117751.jpg',
          },
        ],
        showComments: false,
      },
    },
    {
      image:
        'https://moosend.com/wp-content/uploads/2019/07/landing-pages-hero-inside.png',
      likes: 1000,
      liked: false,
      name: 'Social Media: Kringo',
      post: {
        sharedBy: null,
        commented: false,
        shared: false,
        name: 'Social Media , Kringo',
        sharedByPhoto:
          'https://moosend.com/wp-content/uploads/2019/07/landing-pages-hero-inside.png',
        text: 'Social Media are conquering our lifes!',
        image:
          'https://www.insidemarketing.eu/cdn/wp-content/uploads/2020/01/social-media-620x324.jpg',
        description: '',
        likes: 100,
        likePressed: false,
        comments: [
          {
            commentId: 1,
            likePressed: false,
            editMode: false,
            name: 'Romanov',
            remove: false,
            likes: 0,
            comment: 'woow',
            image:
              'https://image.shutterstock.com/image-vector/portrait-woman-head-girl-avatar-260nw-1287117751.jpg',
          },
        ],
        showComments: false,
      },
    },
    {
      image:
        'https://i.pinimg.com/236x/cf/31/5e/cf315e1d26989b15cf5a30b970be1574--watch-chopped-food-networktrisha.jpg',
      likes: 400,
      liked: false,
      name: 'Funny memes',
      post: {
        shared: false,
        commented: false,
        sharedByPhoto:
          'https://i.pinimg.com/236x/cf/31/5e/cf315e1d26989b15cf5a30b970be1574--watch-chopped-food-networktrisha.jpg',
        sharedBy: null,
        name: 'Social Media: Kringo',
        text: 'XD XD',
        image:
          'https://blog.yellowoctopus.com.au/wp-content/uploads/2018/03/yellow-octopus-funny-memes-23.jpg',
        description: '',
        likes: 100,
        likePressed: false,
        comments: [
          {
            commentId: 0,
            likePressed: false,
            editMode: false,
            name: 'Romanov',
            remove: false,
            likes: 0,
            comment: 'woow',
            image:
              'https://image.shutterstock.com/image-vector/portrait-woman-head-girl-avatar-260nw-1287117751.jpg',
          },
        ],
        showComments: false,
      },
    },
  ];
}
