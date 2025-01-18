import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  hasRole(role: string): boolean {
    const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
    return userRoles.includes(role);
  }
}
