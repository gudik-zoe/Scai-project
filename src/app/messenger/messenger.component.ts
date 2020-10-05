import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private storageService: StorageService,
    private aroute: ActivatedRoute,
    private route: Router,
    private accountService: AccountService,
    private chatService: ChatService,
    private http: HttpClient,
    private _sanitizer: DomSanitizer
  ) { }
  id: number;
  myConvWith;
  userData;
  requestedUser;
  message: string;

  getMyConvWithId(id) {
    this.chatService.getMyConvWithId(id).subscribe((data) => {
      this.myConvWith = data;
      console.log(this.myConvWith);
    });
  }

  getUserById() {
    this.accountService.getAccountById(this.id).subscribe((data) => {
      this.requestedUser = data;
    });
  }

  sendMessage(text) {
    this.chatService.sendAMessage(this.id, text).subscribe(
      (data) => {
        this.getMyConvWithId(this.id);
        this.message = null;
      },
      (error) => {
        if (
          (error.error.message =
            'No entity found for query; nested exception is javax.persistence.NoResultException: No entity found for query')
        ) {
          console.log('ur are not friend with the user yet');
        }
      }
    );
  }

  getUserData() {
    this.accountService.getData().subscribe((data) => {
      this.userData = data;
    });
  }

  ngOnInit() {
    this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
    this.getUserById();
    this.getMyConvWithId(this.id);
    this.getUserData();
  }
}
