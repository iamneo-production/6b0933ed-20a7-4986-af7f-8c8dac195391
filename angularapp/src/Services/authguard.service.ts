import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getUserRole()||"";
      if ((userRole)) {
        return true;
      } else {
        // Redirect to unauthorized page or default route
        return this.router.parseUrl('/unauthorized');
      }
    } else {
      // Redirect to login page
      return this.router.parseUrl('/login');
    }
  }
}

