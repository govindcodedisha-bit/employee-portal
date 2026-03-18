import { Component, inject, signal } from '@angular/core';
// CHANGE: Import 'Router' instead of 'RouterLink' for the service logic
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { filter, Observable } from 'rxjs';
import { CounterStore } from '../../store/counter/counter.reducer';
import { select, Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/authservice';


@Component({
  selector: 'app-navbar',
  standalone: true, // Recommended for Angular 21
  imports: [RouterLink, NgbCollapseModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // FIX: Change 'RouterLink' to 'Router'
  private router = inject(Router);
  public authService = inject(AuthService);
  // Using a Signal to track if the navbar is collapsed
  isMenuCollapsed = signal(true);
   userName = this.authService.userName;

  toggleMenu() {
    this.isMenuCollapsed.update(val => !val);
  }
  counterValue: Observable<number> = new Observable<number>
  constructor(private store: Store<CounterStore>) {
    // Now 'this.router.events' will work because 'Router' is a service
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Auto-close the menu when navigation completes
      this.isMenuCollapsed.set(true);
    });

    this.counterValue = this.store.pipe(select('count'));
  }

  logout() {
    this.authService.logout();
  }
}