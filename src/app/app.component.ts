import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private postService:PostsService , private route:Router) {}
  title = 'scai-project';
  loggedIn= []
 
  

  logOut(){
    this.postService.logOut()
    this.route.navigate(['/auth']);
    console.log(this.loggedIn)
  }
  
  ngOnInit() {
     this.loggedIn = this.postService.signedIn

  }

}
