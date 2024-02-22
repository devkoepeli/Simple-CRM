import { Component, HostListener, inject, NgZone, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../services/sidenav/sidenav.service';
import { Router, RouterLink } from '@angular/router';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconButton, MatIconModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  isOptionsOpen = false;
  userName: string | null = '';

  sidenavService = inject(SidenavService);
  router = inject(Router);
  auth = inject(Auth);

  constructor() { }

  ngOnInit() {
    this.getUserName();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const eventTarget = event.target as HTMLElement;
    if (eventTarget.id !== 'logout' && this.isOptionsOpen) {
      this.isOptionsOpen = false;
    }
  }

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

  showOptions() {
    this.isOptionsOpen = !this.isOptionsOpen;
  }

  getUserName() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      this.userName = user.displayName;
    }
  }

  logout() {
    this.auth.signOut()
      .then(() => {
        this.router.navigate(['login']);
      })
  }
}
