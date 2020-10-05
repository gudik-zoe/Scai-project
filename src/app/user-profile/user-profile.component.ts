import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccountModel } from '../models/account';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { EventsService } from '../services/events.service';
import { PostsService } from '../services/posts.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private route: Router,
    private service: PostsService,
    private postService: PostsService,
  ) { }
  imgUrl: string = environment.rootUrl + 'files/';
  userData: any
  myPosts

  private getUserData() {
    return new Promise((resolve) => {
      this.accountService.getData().subscribe(data => {
        this.userData = data
      })
    })
  }

  async getUser() {
    await this.getUserData()
  }

  private getMyPosts() {
    this.postService.getMyPosts().subscribe(data => {
      this.myPosts = data
      console.log(this.myPosts)
    })
  }

  goToEditing() {
    this.route.navigate(['/account-settings'])
  }


  ngOnInit() {
    this.getUser()
    this.getMyPosts()
  }
}
