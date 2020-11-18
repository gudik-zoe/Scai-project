import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Relationship } from '../models/relationship';
import { AccountService } from '../services/account.service';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css'],
})
export class FriendRequestComponent implements OnInit {
  relations: Relationship[];

  imgUrl: string = environment.rootUrl + 'files/';
  constructor(
    private friendService: FriendsService,
    private accountService: AccountService
  ) {}

  async getFriendRequests() {
    this.relations = await this.friendService.getFriendRequests();
  }

  respondFriendRequest(id: number, status: number) {
    this.friendService.acceptFriendRequest(id, status).subscribe((data) => {
      this.relations = this.relations.filter(
        (item) => item.idRelationship !== id
      );
    });
  }

  ngOnInit() {
    this.getFriendRequests();
  }
}
