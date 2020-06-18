import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './log-in/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedUserGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.auth.loggedIn()) {
      this.route.navigate(['/home-page']);
      return false;
    } else {
      return true;
    }
  }
}
