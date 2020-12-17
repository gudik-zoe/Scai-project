import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountBasicData } from '../models/accountBasicData';
import { Relationship } from '../models/relationship';
import { AccountService } from './account.service';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}
  rootUrl: string = environment.rootUrl;
  relations: Relationship[];
  status: string;
  respondToRequest = new Subject<any>();
  unfriendSubject = new Subject<any>();
  openFriendsTab = new Subject<boolean>();
  getRelationStatusBetweenMeAnd(userId: number) {
    return new Promise<string>((resolve) => {
      this.http
        .get(this.rootUrl + 'relation/getRelation/accountId/' + userId)
        .subscribe((data: Relationship) => {
          console.log(data);
          if (!data) {
            this.status = 'add friend';
          } else if (
            data.status == 0 &&
            data.userTwoId == this.accountService.userData.idAccount
          ) {
            console.log('sent u a friend request');
            this.status = 'sent u a friend request';
          } else if (
            data.status == 0 &&
            data.userTwoId !== this.accountService.userData.idAccount
          ) {
            console.log('pending cancel request');
            this.status = 'pending cancel request';
          } else {
            this.status = 'friends';
          }
          resolve(this.status);
        });
    });
  }

  getFriendRequests() {
    return new Promise<Relationship[]>((resolve) => {
      this.http
        .get(this.rootUrl + 'relation/getFriendRequests/accountId')
        .subscribe((data: Relationship[]) => {
          this.relations = data;
          this.getFullRelationshipData(this.relations);
          resolve(this.relations);
        });
    });
  }

  async getFullRelationshipData(relations: Relationship[]) {
    for (let relation of relations) {
      relation.doneBy = await this.accountService.getBasicAccountDetails(
        relation.userOneId
      );
    }
  }

  sendFriendRequest(userId: number) {
    return this.http.post(this.rootUrl + 'relation/accountId/' + userId, {});
  }

  acceptFriendRequest(relationshipId, status) {
    return this.http.put(
      this.rootUrl + 'relation/answerRequest/' + relationshipId + '/' + status,
      {}
    );
  }

  deleteOrCancelFriendRequest(user2Id: number) {
    return this.http.delete(
      this.rootUrl + 'relation/deleteRequest/accountId/' + user2Id
    );
  }

  async getMyFriendsData(relationships: Relationship[]) {
    for (let relation of relationships) {
      if (relation.userOneId != this.accountService.getId()) {
        relation.doneBy = await this.accountService.getBasicAccountDetails(
          relation.userOneId
        );
      } else {
        relation.doneBy = await this.accountService.getBasicAccountDetails(
          relation.userTwoId
        );
      }
    }
  }

  getMyFriends() {
    let relationships;
    return new Promise<Relationship[]>((resolve, reject) => {
      this.http
        .get(this.rootUrl + 'relation/getMyFriends')
        .subscribe((data) => {
          relationships = data;
          this.getMyFriendsData(relationships);
          resolve(relationships);
          reject('promise error');
        });
    });
  }
}
