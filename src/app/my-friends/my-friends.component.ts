import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { AuthService } from '../log-in/auth.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css'],
})
export class MyFriendsComponent implements OnInit {
  users: any[] = this.auth.localStorageArray;
  currentUser: number = JSON.parse(localStorage.getItem('key'));
  error: boolean = false;
  id: number = null;
  show: boolean = false;
  constructor(
    private postService: PostsService,
    private route: Router,
    private auth: AuthService,
    private chat: ChatService
  ) {}
  userFriends = JSON.parse(localStorage.getItem('user'));
  currentUserId = JSON.parse(localStorage.getItem('key'));
  inputData;
  messageSent: boolean = false;

  ok(): void {
    this.error = false;
  }
  open(id: number): void {
    this.id = id;
    this.show = !this.show;
  }
  sendTo(id: number, data: string): void {
    if (
      this.inputData === '' ||
      this.inputData === ' ' ||
      this.inputData == null
    ) {
      this.error = true;
    } else {
      this.error = false;
      this.messageSent = true;
      this.chat.sendTo(id, data);
      this.inputData = null;

      setTimeout(() => {
        this.id = null;
        this.messageSent = false;
      }, 1000);
    }
  }
  ngOnInit() {}
}
