import { Component, OnInit } from '@angular/core';
import { PostsService } from './posts.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from './log-in/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  constructor(private postService:PostsService , private route:Router , private auth:AuthService) {}
  title = 'scai-project';
  loggedIn= []
 
  

  logOut(){
    this.auth.logOut()
    this.route.navigate(['/auth']);
    // console.log(this.loggedIn)
  }
  
  ngOnInit() {
     this.loggedIn = this.auth.signedIn

  }

}
