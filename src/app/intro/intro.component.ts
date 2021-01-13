import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../models/account';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
  constructor(private route: Router) {}

  @Input() userData: Account;
  @Input() loggedInUserData: Account;

  goToEditing() {
    this.route.navigate(['/account-settings']);
  }
  ngOnInit() {}
}
