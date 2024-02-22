import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss'
})
export class SidenavListComponent implements OnInit {
  currentRoute: 'dashboard' | 'customers' | 'products' | 'orders' | 'login' = 'dashboard';

  router = inject(Router);
  auth = inject(Auth);

  constructor() {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/') {
          this.currentRoute = 'dashboard';
        } else if (/^\/customers(\/edit\/.+)?$/.test(event.url)) {
          this.currentRoute = 'customers';
        } else if (/^\/products(\/edit\/.+)?$/.test(event.url)) {
          this.currentRoute = 'products';
        } else if (event.url == '/orders') {
          this.currentRoute = 'orders';
        }
      }
    })
  }

  logout() {
    this.auth.signOut()
    .then(() => {
      this.router.navigate(['login']);
    })
  }
}
