import { Injectable, signal } from '@angular/core';
import { Role } from '../models/role.enum';
import { toRole } from '../core/utils/role.util'; // ✅ fixed path

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal<boolean>(false);
  private role = signal<Role | null>(null);
  userName = signal<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {

      const token = sessionStorage.getItem('token');
      const roleFromStorage = sessionStorage.getItem('Role');
      const storedName = sessionStorage.getItem('UserName');

      this.isLoggedIn.set(!!token);
      if (storedName) {
        this.userName.set(storedName); // load username
      }

      // safe conversion
      const role = toRole(roleFromStorage);
      if (role) {
        this.role.set(role);
      }
    }
  }

  login(token: string) {
    sessionStorage.setItem('token', token);
    this.isLoggedIn.set(true);
  }

  setUserName(name: string) {
    sessionStorage.setItem('UserName', name);
    this.userName.set(name)
  }

  getUserName() {
    return sessionStorage.getItem('UserName');
  }

  setUserRole(role: string) {
    const roleEnum = toRole(role);

    if (!roleEnum) {
      console.error('Invalid role received:', role);
      this.logout();
      return;
    }

    sessionStorage.setItem('Role', roleEnum);
    this.role.set(roleEnum);
  }

  getUserRole(): Role | null {
    return this.role();
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('Role');
    sessionStorage.removeItem('UserName');

    this.isLoggedIn.set(false);
    this.role.set(null);
    this.userName.set(null);
  }
}