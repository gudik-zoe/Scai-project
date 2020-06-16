import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  users = []
  signedIn :  Subject <boolean> = new Subject()
  localStorageArray = JSON.parse(localStorage.getItem('user'))
  requestedUserIndex
  currentUser = []
    loggedIn(){
        return !!localStorage.getItem('user')
    }
    signUp(data){ 
      this.users.push(data)
      if (JSON.parse(localStorage.getItem('user')) === null){
         localStorage.setItem('user', JSON.stringify(this.users));
      }else {
     this.localStorageArray.push(data)
      localStorage.setItem('user' , JSON.stringify(this.localStorageArray))
        }
    }
  
    signIn(email,password){
      this.requestedUserIndex = this.localStorageArray.findIndex(item => item.email === email && item.password === password )
      if(this.requestedUserIndex !== -1){
          this.signedIn.next(true)
          this.currentUser.push(this.requestedUserIndex)
          return true 
      }
      else {
          return false 
            }
}
logOut() {
 this.currentUser = []
 this.signedIn.next(false)

}
    

  constructor() {}
}
