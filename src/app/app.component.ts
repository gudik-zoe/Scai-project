import { Component, OnInit , OnDestroy} from '@angular/core';
import { PostsService } from './posts.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthService } from './log-in/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , OnDestroy  {
  constructor(private postService:PostsService , private route:Router , private auth:AuthService) {}
  title = 'scai-project';
  loggedInSubscription:Subscription

  loggedIn

 
  

  logOut(){
    this.auth.logOut()
    this.route.navigate(['/auth']);
    // console.log(this.loggedIn)
  }
  
  ngOnInit() {
     this.loggedInSubscription =  this.auth.signedIn.subscribe( data => this.loggedIn = data)
    //  this.loggedIn = this.auth.signedIn

  }
  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe()

    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
