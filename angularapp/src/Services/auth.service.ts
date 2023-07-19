import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;
  private token: string | null = null;
  private userRole: string | null = null;
  private userId:1;

  constructor(private router: Router) {
    // Check if the user is already authenticated on application startup
    this.checkAuthentication();
  }

  login(token: string) {
    this.authenticated = true;
    this.token = token;
    const decodedToken: any = jwtDecode(token);
    this. userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    this.userRole=decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', this.userRole);
    console.log(decodedToken);
    console.log(this.userId)
  }

  logout() {
    this.authenticated = false;
    this.token = null;
    this.userRole = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/user/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
  getUserId(): any {
    return this.userId;
  }
  getUserToken(): any {
    return this.token;
  }

  validateToken(): boolean {
    return true;
  }

  checkAuthentication() {
    if (this.isAuthenticated() && !this.validateToken()) {
      this.logout();
    }
  }
}