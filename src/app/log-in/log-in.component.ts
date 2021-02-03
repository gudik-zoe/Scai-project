import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, private snackBar: MatSnackBar) {}
  emailExistError: boolean = false;
  loading: boolean = false;
  errorPhrase: string = '';
  selectedTab: number;

  subscription: Subscription;
  getSignUpSuccessgful() {
    this.subscription = this.auth.openSignInComponent.subscribe(
      (data: boolean) => {
        if (data) {
          this.selectedTab = 0;
          this.snackBar.open('your have been registered successfully', '', {
            duration: 2000,
            panelClass: 'snackbar',
          });
        }
      }
    );
  }

  ngOnInit(): void {
    this.getSignUpSuccessgful();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
