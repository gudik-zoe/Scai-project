import { Injectable } from '@angular/core';
import { AuthService } from './log-in/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private auth : AuthService) { }

  getName(){
  return  this.auth.localStorageArray[this.auth.currentUser[0]].name
 
  }
  getLastName(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].lastName 
  }
  getEmail(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].email; 
  }
  getPassword(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].password 
  }
  getConfirmPassword(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].confirmPassword 
  }
  getGender(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].gender
  }
  getStudy(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].study 
  }
  getWentTo(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].wentTo
  }
  getFrom(){
    return this.auth.localStorageArray[this.auth.currentUser[0]].from
  }
  getLivesIn(){
    return  this.auth.localStorageArray[this.auth.currentUser[0]].livesIn
  }
  
  
}
