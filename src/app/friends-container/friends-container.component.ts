import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friends-container',
  templateUrl: './friends-container.component.html',
  styleUrls: ['./friends-container.component.css'],
})
export class FriendsContainerComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private friendService: FriendsService
  ) {}

  userData;
  users;
  notification;

  getUsers() {
    return new Promise((resolve) => {
      this.accountService.getUsers().subscribe((data) => {
        this.users = data;
        resolve(this.users);
      });
    });
  }
  getUserData() {
    return new Promise((resolve) => {
      this.accountService.getData().subscribe((data) => {
        this.userData = data;
        resolve(this.userData);
      });
    });
  }
  goToFriendsCharRoom(id: number): void {
    this.route.navigate(['/messenger', id]);
  }

  async functions() {
    await this.getUserData();
    await this.getUsers();
    // await this.relationChecker();
  }

  ngOnInit() {
    this.functions();
  }
}
