import { Component, HostListener, inject, NgZone } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidenavService } from '../services/sidenav/sidenav.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconButton, MatIconModule, RouterLink],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  isOptionsOpen = false;

  constructor(private sidenavService: SidenavService) { }

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
}
