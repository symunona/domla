/**
 * Makes sure we only access the days view if we are
 * logged in.
 */

import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthService, private router:Router) {}

  canActivate(route:ActivatedRouteSnapshot,
              state:RouterStateSnapshot):Observable<boolean> {

    // LEARN NOTE: I wanted to achieve, that if the user is not present,
    // redirect to the login page, but I am not sure, if
    // this is a good pattern.
    return this.authService.userObservable.map(user=>{
      return !!user;
    }).do(allowed => {
          if(!allowed) {
            this.router.navigate(['/login']);
          }
        });
  }
}
