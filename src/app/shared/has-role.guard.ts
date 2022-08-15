import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService: LoginService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.authService.clearance$.level> route.data.clearance
      console.log('clearance lvl <------------------------------',this.authService.clearance$.level + ' & ' + route.data.clearance)
    if (!isAuthorized){
      alert('You do not have the privileges required to see this precious page')
    }
    return isAuthorized
  }
  
}
