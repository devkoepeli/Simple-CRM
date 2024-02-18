import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartItem, PieController, ArcElement, Tooltip } from 'chart.js/auto';
import { OrdersService } from '../../../services/orders/orders.service';

Chart.register(PieController, ArcElement);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements AfterViewInit {
  ordersDataService = inject(OrdersService);

  data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  @ViewChild('pieChart') pieChartElementRef!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const chartContext: ChartItem = this.pieChartElementRef.nativeElement; 

    new Chart(chartContext, {type: 'pie', data: this.data});
  }


}
