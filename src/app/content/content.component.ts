import { Component } from '@angular/core';
import { MainContentComponent } from '../main-content/main-content.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [SidenavComponent, ToolbarComponent, MainContentComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent {

}
