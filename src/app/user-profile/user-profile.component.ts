import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../posts.service';
import { StorageService } from '../storage.service';
import { AuthService } from '../log-in/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private route: Router,
     private service: PostsService ,
      private storageService: StorageService , 
      private auth:AuthService) {}
  sharedPosts = [];
  image(){
    return this.storageService.getImage()
  }
  checkImage(){
    return this.storageService.noImage()
  }
 
  edit() {
    this.route.navigate(['/account-settings']);
  }

  toDescription(id) {
    this.route.navigate(['description', id]);
  }
 
  name() {
    return this.storageService.getName()
  }
  lastName(){
    return this.storageService.getLastName()
  }
  study() {
    return  this.storageService.getStudy()
   }
  wentTo() {
   return  this.storageService.getWentTo()
  }

  livesIn() {
    return    this.storageService.getLivesIn()
  }
  from() {
    return this.storageService.getFrom()
  }
  toHome(){
    this.route.navigate(['/home-page'])
  }
  goToFriends(){
    this.route.navigate(['my-friends'])
  }

  getPersonalPosts(){
  return  this.storageService.getUserPosts()
    }

  
  ngOnInit() {
    this.sharedPosts = this.service.sharedPosts;
  }
}
