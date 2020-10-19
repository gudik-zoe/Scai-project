import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
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

  getRelationStatusBetweenMeAnd(userId) {
    return new Promise((resolve) => {
      this.http
        .get(
          'http://localhost:8080/relation/getRelation/' +
            this.accountService.getId() +
            '/' +
            userId
        )
        .subscribe((data: number) => {
          switch (data) {
            case null:
              this.status = 'add friend';
              break;
            case 0:
              this.status = 'pending-cancel request';
              break;
            case 1:
              this.status = 'chat';
              break;
            default:
              this.status = 'blocked';
          }
          resolve(this.status);
        });
    });
  }

  getFriendRequests(id) {
    return new Promise((resolve) => {
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
