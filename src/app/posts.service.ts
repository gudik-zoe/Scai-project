import { Injectable, ɵisListLikeIterable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  sharedPosts = [];
  signedIn = []
  userFriends = []
  constructor() {}
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

  share(id) {
    this.sharedPosts.push(this.posts[id]);
  }

  logOut() {
    localStorage.removeItem('key');
    this.signedIn.pop()
  }

  addFriend(id){
    this.userFriends.push(this.friends[id])
    this.friends[id].pressed = true
  }
 unFriend(id){
    this.userFriends = this.userFriends.filter(item => item.id !== id)
   this.friends[id].pressed = false
 }

 friends = [
  {
  fullName: 'Bruce wayne' ,
  image: 'https://image.freepik.com/vettori-gratuito/avatar-guy-mascot-design_35422-117.jpg' ,
  id:0 ,
  online:true,
  pressed:false
},
  {
  fullName: 'steve rogers' ,
  image: 'https://image.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-562077406.jpg' ,
  id:1 ,
  online:false,
  pressed:false
},
  {
  fullName: 'milaia' ,
  id:2,
  online:true,  
  pressed:false ,
  image: 'https://c8.alamy.com/compit/k4affg/icona-utente-avatar-maschio-in-business-suit-imprenditore-icona-piatta-uomo-in-business-suit-avatar-di-imprenditore-flat-internet-icona-in-forma-arrotondata-web-k4affg.jpg'
 },
  {
  fullName: 'spiky' ,
  id:3,
  online:false,
  pressed:false,
  image: 'https://png.pngtree.com/png-vector/20190704/ourlarge/pngtree-boy-user-avatar-vector-icon-free-png-image_1538406.jpg' 
}
 ]

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


}
