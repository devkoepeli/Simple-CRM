import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartItem, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, ChartConfiguration } from 'chart.js';
import { OrdersService } from '../../../services/orders/orders.service';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale)

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent implements AfterViewInit{
  @ViewChild('lineChart') lineChartRef!: ElementRef<HTMLCanvasElement>;

  ordersDataService = inject(OrdersService);

  MONTHS = ['December', '', 'January', '', 'February', ''];

  ordersDec1: number = this.getMonthlyOrders(11, 'first');
  ordersDec2: number = this.getMonthlyOrders(11, 'second');
  ordersJan1: number = this.getMonthlyOrders(0, 'first');
  ordersJan2: number = this.getMonthlyOrders(0, 'second');
  ordersFeb1: number = this.getMonthlyOrders(1, 'first');
  ordersFeb2: number = this.getMonthlyOrders(1, 'second');

  
  ngAfterViewInit() {
    this.renderChart();
  }

  getMonthlyOrders(month: number, half: string): number {
    let ordersFirstHalf = 0;
    let ordersSecondHalf = 0;

    this.ordersDataService.orders.forEach(order => {
      if (order.date.getMonth() === month) {
        if (order.date.getDate() < 15) {
          ordersFirstHalf += 1;
        } else {
          ordersSecondHalf += 1;
        }
      }
    })

    if (half === 'first') {
      return ordersFirstHalf;
    } else return ordersSecondHalf;
  }

  renderChart() {
    const chartContext: ChartItem = this.lineChartRef.nativeElement;
    const config: ChartConfiguration = {
      type: 'line',
      options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 12
            }
        }
    },
      data: {
        labels: this.MONTHS,
        datasets: [{
        label: 'Orders',
        data: [this.ordersDec1, this.ordersDec2, this.ordersJan1, this.ordersJan2, this.ordersFeb1, this.ordersFeb2],
        fill: true,
        backgroundColor: 'rgba(63, 81, 181, 0.1)',
        borderColor: '#3f51b5',
        tension: 0.2
      }]
    }
    }

    new Chart(chartContext, config)
  }
}
