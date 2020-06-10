import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(private route: Router) {}
  getFullName() {
    return (
      JSON.parse(localStorage.getItem('key')).name +
      ' ' +
      JSON.parse(localStorage.getItem('key')).lastName
    );
  }
  edit() {
    this.route.navigate(['/account-settings']);
  }

  getStudy() {
    return JSON.parse(localStorage.getItem('key')).study;
  }

  getWentTo() {
    return JSON.parse(localStorage.getItem('key')).wentTo;
  }

  getLivesIn() {
    return JSON.parse(localStorage.getItem('key')).livesIn;
  }
  getFrom() {
    return JSON.parse(localStorage.getItem('key')).from;
  }
  ngOnInit() {}
}
