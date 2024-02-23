import { AfterViewInit, Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { SidenavService } from '../services/sidenav/sidenav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    SidenavListComponent
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatDrawer;

  sidenavService = inject(SidenavService);
  isOpen = true;
  
  screenWidth: number = window.innerWidth;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
    if (window.innerWidth <= 991.98) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }
  }

  closeSidenav() {
    this.sidenav.close();
  }

  closeSidenavMobile() {
    if (this.screenWidth <= 991.98) {
      this.sidenav.close();
    }
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
