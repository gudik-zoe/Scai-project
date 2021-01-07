import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { PagesService } from './services/pages.service';

@Injectable({
  providedIn: 'root',
})
export class PageGuard implements CanActivate {
  constructor(private route: Router, private pageService: PagesService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.pageService.userAccess) {
      console.log(this.pageService.userAccess);
      console.log('access granted');
      return true;
    } else {
      console.log(this.pageService.userAccess);
      console.log('access denied');
      return false;
    }
  }
}
