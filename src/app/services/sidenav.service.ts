import { Injectable } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  sidenav!: MatDrawer;

  constructor() { }

  setSidenav(sidenav: MatDrawer) {
    this.sidenav = sidenav;
  }

  toggleSidenav() {
    return this.sidenav.toggle();
  }
}
