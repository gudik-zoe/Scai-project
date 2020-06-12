import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
    loggedIn(){
        return !!localStorage.getItem('key')
    }
    signUp(data){
      localStorage.setItem('key', JSON.stringify(data));
    }
    changePasswordfunc(data){
      localStorage.setItem('key', JSON.stringify(data))
    }

    signIn(email,password){
      if (email === JSON.parse(localStorage.getItem('key')).email &&
      password === JSON.parse(localStorage.getItem('key')).password){
        return true
      }
         else {
            return false
        }
}
    

  constructor() {}
}
