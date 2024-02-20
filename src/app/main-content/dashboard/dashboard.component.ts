import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OrdersTableComponent } from '../orders/orders-table/orders-table.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    SummaryCardsComponent,
    LineChartComponent,
    PieChartComponent,
    OrdersTableComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  customersAmount!: number;
  inventoryAmount!: number;

  setAmounts(amounts: { customersAmount: number, inventoryAmount: number }) {
    this.customersAmount = amounts.customersAmount;
    this.inventoryAmount = amounts.inventoryAmount;
  }
}