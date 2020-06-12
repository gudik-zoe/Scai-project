import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getName(){
    return JSON.parse(localStorage.getItem('key')).name; 
  }
  getLastName(){
    return JSON.parse(localStorage.getItem('key')).lastName; 
  }
  getEmail(){
    return JSON.parse(localStorage.getItem('key')).email; 
  }
  getPassword(){
    return JSON.parse(localStorage.getItem('key')).password; 
  }
  getConfirmPassword(){
    return JSON.parse(localStorage.getItem('key')).confirmPassword; 
  }
  getGender(){
    return JSON.parse(localStorage.getItem('key')).gender; 
  }
  getStudy(){
    return JSON.parse(localStorage.getItem('key')).study; 
  }
  getWentTo(){
    return JSON.parse(localStorage.getItem('key')).wentTo; 
  }
  getFrom(){
    return JSON.parse(localStorage.getItem('key')).from; 
  }
  getLivesIn(){
    return JSON.parse(localStorage.getItem('key')).livesIn; 
  }
  
  
}
