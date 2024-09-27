import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.isAuthenticated(); // Implement your auth logic here
    if (!isAuthenticated) {
      this.router.navigate(['/home']); // Redirect to home if not authenticated
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    // This is where you can check the authentication state, e.g., a token
    return false; // Set to true to allow access, false to deny
  }
}
