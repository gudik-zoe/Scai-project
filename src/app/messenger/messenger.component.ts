import { Component, OnInit } from '@angular/core';
import { AuthService } from '../log-in/auth.service';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../chat.service';

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
    private chat: ChatService
  ) {}
  users = this.auth.localStorageArray;
  currentUser = JSON.parse(localStorage.getItem('key'));
  id = null;
  inputData;
  messageTo;
  sentMessage;
  error;
  messages = this.auth.localStorageArray[this.currentUser].messages;
  ok() {
    this.error = false;
  }
  navigate(id) {
    this.id = id;
  }
  open(id) {
    this.id = id;
  }
  send(id, data) {
    if (
      this.inputData === '' ||
      this.inputData === ' ' ||
      this.inputData == null
    ) {
      this.error = true;
    } else {
      this.chat.send(id, data);
    }
    this.id = null;
  }

  ngOnInit() {}
}
