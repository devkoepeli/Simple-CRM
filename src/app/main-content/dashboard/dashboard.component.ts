import { Component } from '@angular/core';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SummaryCardsComponent,
    LineChartComponent,
    PieChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}