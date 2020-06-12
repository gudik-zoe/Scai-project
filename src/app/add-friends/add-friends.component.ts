import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.component.html',
  styleUrls: ['./add-friends.component.css']
})
export class AddFriendsComponent implements OnInit {

  constructor(private postService:PostsService) { }


  friends = []

  add(id){
    this.postService.addFriend(id)
  }
  ngOnInit() {
    this.friends = this.postService.friends

  }

}
