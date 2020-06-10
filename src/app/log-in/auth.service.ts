import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 
    loggedIn(){
        return !!localStorage.getItem('key')
    }

  constructor() {}
}
