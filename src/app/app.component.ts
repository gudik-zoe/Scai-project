import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './posts.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from './log-in/auth.service';
import { Subscription } from 'rxjs';
import { StorageService } from './storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private postService: PostsService,
    private route: Router,
    private auth: AuthService,
    private storageService: StorageService
  ) {}
  title = 'scai-project';
  loggedInSubscription: Subscription;
  show = true;
  message = false;
  loggedIn;
  userIn() {
    if (JSON.parse(localStorage.getItem('key')) !== null) {
      return true;
    } else {
      return false;
    }
  }
  navigate() {
    this.show = false;
  }
  getUserName() {
    return this.storageService.getName();
  }
  getMessengerLength() {
    return this.storageService.getMessages().length;
  }
  image() {
    return this.storageService.getImage();
  }

  logOut() {
    this.route.navigate(['/auth']);
    localStorage.removeItem('key');
    this.show = true;
  }

  ngOnInit() {
    this.storageService.message.subscribe((data) => {
      this.message = data;
    });
  }
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }
}
