import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  constructor(
    private http: HttpClient,
    private accountService: AccountService
  ) {}

  getRelationStatusBetweenMeAnd(userId) {
    return this.http.get(
      'http://localhost:8080/relation/getRelation/' +
        this.accountService.getId() +
        '/' +
        userId
    );
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

  respondeToFriendRequest(userId, status) {
    return this.http.put(
      'http://localhost:8080/relation/answerRequest/' +
        this.accountService.getId() +
        '/' +
        userId +
        '/' +
        status,
      {}
    );
  }
}
