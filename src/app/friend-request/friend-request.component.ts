import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { Relationship } from '../models/relationship';
import { FriendsService } from '../services/friends.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css'],
})
export class FriendRequestComponent implements OnInit {
  relations: Relationship[];

  constructor(
    private friendService: FriendsService,
    private snackBar: MatSnackBar
  ) {}

  async getFriendRequests() {
    this.relations = await this.friendService.getFriendRequests();
  }

  respondFriendRequest(relation: Relationship, status: number) {
    this.friendService
      .acceptFriendRequest(relation.idRelationship, status)
      .subscribe(
        (data: Relationship) => {
          if (data) {
            this.friendService.respondToRequest.next({
              userBasicData: relation.doneBy,
              status: data.status,
            });
            this.relations = this.relations.filter(
              (item) => item.idRelationship !== relation.idRelationship
            );
          } else {
            this.relations = this.relations.filter(
              (item) => item.idRelationship !== relation.idRelationship
            );
          }
        },
        (error) =>
          this.snackBar.open(error.error.message, '', { duration: 2000 })
      );
  }

  ngOnInit() {
    this.getFriendRequests();
  }
}
