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
    private postService: PostsService
  ) {}
  signUp: boolean = true;
  dataSaved: boolean = false;
  error: boolean = false;
  logged = [];
  emailExist: boolean = false;

  signUpfunc(data: any): void {
    if (!this.auth.check(data.email)) {
      this.auth.signUp(data);
      this.dataSaved = true;
    } else {
      this.emailExist = true;
    }
  }

  signUpAgain(): void {
    this.emailExist = false;
    this.signUpForm.reset();
  }

  signIn(email: string, password: any): void {
    if (this.auth.signIn(email, password)) {
      this.route.navigate(['/home-page']);
      this.error = false;
    } else {
      this.error = true;
    }
  }

  ok(): void {
    this.error = false;
  }

  switch(): void {
    this.signUp = !this.signUp;
    this.dataSaved = false;
  }

  signUpForm: FormGroup;
  signInForm: FormGroup;
  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        image: [null],
        coverPhoto: [null],
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
        messages: [[]],
        posts: [
          [
            {
              sharedBy: '',
              text: '',
              image:
                'https://www.playblog.it/wp-content/uploads/2020/02/Come-creare-GIF-animate-da-qualsiasi-pc-Windows-960x640.jpg',
              description: 'how to ...',
              likes: 0,
              likePressed: false,
              comments: [],
              showComments: false,
              id: 0,
            },
          ],
        ],
      },
      { validator: [Custome.PasswordConfirmation] }
    );
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
