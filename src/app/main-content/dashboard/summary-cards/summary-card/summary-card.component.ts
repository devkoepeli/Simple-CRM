import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SummaryItem } from '../../../../models/summary-item.interface';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './summary-card.component.html',
  styleUrl: './summary-card.component.scss'
})
export class SummaryCardComponent {
  @Input() item!: SummaryItem; 
}
