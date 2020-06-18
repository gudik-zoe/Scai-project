import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './log-in/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private service: AuthService, private route: Router) {}

  canActivate() {
    if (this.service.loggedIn()) {
      return true;
    } else {
      this.route.navigate(['/auth']);
      return false;
    }
  }
}
