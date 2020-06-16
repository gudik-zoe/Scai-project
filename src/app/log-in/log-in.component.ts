import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Custome } from './validator';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private postService:PostsService
  ) {}
  signUp = true;  
  dataSaved = false;
  error = false;
  logged = []

  signUpfunc(data) {
    this.auth.signUp(data)
    this.dataSaved = true;
  }

   signIn(email,password) {
     if(this.auth.signIn(email,password)){
     this.route.navigate(['/home-page'])
       this.error = false
     }else {
       this.error = true
     }
   }

  ok() {
    this.error = false;
  }

  switch() {
    this.signUp = !this.signUp;
  }
 
  signUpForm: FormGroup;
  signInForm: FormGroup;
  ngOnInit() {
    this.signUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        gender: ['', Validators.required],
        study: [''],
        wentTo: [''],
        livesIn: [''],
        from: [''],
        posts:[
                [
                  
                   {
                      sharedBy:'',
                      text:'',
                      image:
                      'https://www.playblog.it/wp-content/uploads/2020/02/Come-creare-GIF-animate-da-qualsiasi-pc-Windows-960x640.jpg',
                       description: 'how to ...',
                       likes: 0,
                       likePressed : false,
                       comments: [],
                       showComments: false,
                       id: 0 
                    }
                  
                  
                ] 
    
    ]
      },
      { validator: [Custome.PasswordConfirmation] }
    );
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
