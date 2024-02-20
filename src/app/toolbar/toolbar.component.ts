import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '../services/sidenav/sidenav.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconButton, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  isOptionsOpen = false;

  constructor(private sidenavService: SidenavService) {}

  toggleSidenav() {
    this.sidenavService.toggleSidenav();
  }

  showOptions() {
    this.isOptionsOpen = !this.isOptionsOpen;
  }
}
