import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
import { Relationship } from '../models/relationship';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  relations;
  rootUrl: string = environment.rootUrl;
  status: string;
  notifier = new Subject<boolean>();
  basicData = [];

  getRelationStatusBetweenMeAnd(userId: number) {
    return new Promise<string>((resolve) => {
      this.http
        .get(
          'http://localhost:8080/relation/getRelation/' +
            this.accountService.getId() +
            '/' +
            userId
        )
        .subscribe((data: Relationship) => {
          console.log(data, userId, this.accountService.getId());
          if (!data) {
            this.status = 'add friend';
          } else if (
            data.status == 0 &&
            data.userTwoId == this.accountService.getId()
          ) {
            this.status = 'sent you a friend request';
          } else if (
            data.status == 0 &&
            data.userTwoId !== this.accountService.getId()
          ) {
            this.status = 'pending..cancel friend request';
          } else {
            this.status = 'chat';
          }
          resolve(this.status);
        });
    });
  }

  getFriendRequests(id) {
    return new Promise<Relationship[]>((resolve) => {
      this.http
        .get('http://localhost:8080/relation/getFriendRequests/' + id)
        .subscribe((data) => {
          this.relations = data;
          this.getFullRelationshipData(this.relations);
          resolve(this.relations);
        });
    });
  }

  async getFullRelationshipData(relations) {
    for (let relation of relations) {
      const checkIfUserExist = this.basicData.find((item) => {
        item.idAccount == relation.userOneId;
      });
      if (checkIfUserExist) {
        relation.doneBy = checkIfUserExist;
      } else {
        const userBasicData = await this.accountService.getBasicAccountDetails(
          relation.userOneId
        );
        this.basicData.push(userBasicData);
        relation.doneBy = userBasicData;
      }
    }
  }

  sendFriendRequest(userId) {
    return this.http.post(
      'http://localhost:8080/relation/' +
        this.accountService.getId() +
        '/' +
        userId,
      {}
    );
  }

  acceptFriendRequest(relationshipId, status) {
    return this.http.put(
      'http://localhost:8080/relation/answerRequest/' +
        relationshipId +
        '/' +
        status,
      {}
    );
  }

  deleteOrCancelFriendRequest(user1Id, user2Id) {
    return this.http.delete(
      this.rootUrl + 'relation/deleteRequest/' + user1Id + '/' + user2Id
    );
  }
}
// switch (data.status) {

//   case 0 &&
//     data.userOneId == this.accountService.getId() &&
//     data.userTwoId == userId:
//     this.status = 'pending-cancel request';
//     break;
//   case 1:
//     this.status = 'chat';
//     break;
// }
