import { Component, inject, signal } from '@angular/core';
// CHANGE: Import 'Router' instead of 'RouterLink' for the service logic
import { Router, RouterLink, NavigationEnd } from '@angular/router'; 
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true, // Recommended for Angular 21
  imports: [RouterLink, NgbCollapseModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  // FIX: Change 'RouterLink' to 'Router'
  private router = inject(Router); 

  // Using a Signal to track if the navbar is collapsed
  isMenuCollapsed = signal(true);

  toggleMenu() {
    this.isMenuCollapsed.update(val => !val);
  }

  constructor() {
    // Now 'this.router.events' will work because 'Router' is a service
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Auto-close the menu when navigation completes
      this.isMenuCollapsed.set(true);
    });
  }
}