import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal<boolean>(false);

  constructor() {

   if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('token');

      if (token) {
        this.isLoggedIn.set(true);
      }
    }

  }

  login(token: string) {

     if (typeof window !== 'undefined') {
      sessionStorage.setItem('token', token);
    }
    this.isLoggedIn.set(true);

  }

  logout() {

     if (typeof window !== 'undefined') {
      sessionStorage.removeItem('token');
    }

    this.isLoggedIn.set(false);

  }

}