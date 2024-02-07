import { Component, OnInit } from '@angular/core';
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
  isDashboard = false;
  isCustomers = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/') {
          this.isCustomers = false;
          this.isDashboard = true;
        } else if (/^\/customers(\/edit\/.+)?$/.test(event.url)) {
          this.isDashboard = false;
          this.isCustomers = true;
        }
      }
    })
  }

}
