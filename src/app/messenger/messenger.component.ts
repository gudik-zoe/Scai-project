import { Component, OnInit } from '@angular/core';
import { AuthService } from '../log-in/auth.service';
import { StorageService } from '../storage.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: Router
  ) {}
  users = this.auth.localStorageArray;
  currentUser = JSON.parse(localStorage.getItem('key'));
  // messages = this.auth.localStorageArray[
  //   JSON.parse(localStorage.getItem('key'))
  // ].messages;
  messages = this.auth.localStorageArray[this.currentUser].messages;
  navigate(id) {
    this.route.navigate(['/add-friends', id]);
  }
  // image() {
  //   return this.storageService.getImage();
  // }
  // // id;
  // new;

  // reply(data, id) {
  //   let newMessage = this.auth.localStorageArray[id].messages;
  //   // console.log(newMessage);
  //   newMessage.push({
  //     image: this.auth.localStorageArray[this.currentUser].image,
  //     message: data.value,
  //   });

  //   this.new = {
  //     image: this.auth.localStorageArray[id].image,
  //     name: this.auth.localStorageArray[id].name,
  //     lastName: this.auth.localStorageArray[id].lastName,
  //     email: this.auth.localStorageArray[id].email,
  //     password: this.auth.localStorageArray[id].password,
  //     confirmPassword: this.auth.localStorageArray[id].confirmPassword,
  //     gender: this.auth.localStorageArray[id].gender,
  //     study: this.auth.localStorageArray[id].study,
  //     wentTo: this.auth.localStorageArray[id].wentTo,
  //     livesIn: this.auth.localStorageArray[id].livesIn,
  //     from: this.auth.localStorageArray[id].from,
  //     messages: newMessage,
  //     posts: this.auth.localStorageArray[id].posts,
  //   };

  //   this.auth.localStorageArray[id] = this.new;

  //   localStorage.setItem('user', JSON.stringify(this.auth.localStorageArray));
  // }

  ngOnInit() {
    // this.id = parseInt(this.aroute.snapshot.paramMap.get('id'));
  }
}
