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
 
  logOut() {
    localStorage.removeItem('key');
    this.route.navigate(['/auth']);
  }
  
  ngOnInit() {
     this.loggedIn = this.postService.signedIn

  }

}
