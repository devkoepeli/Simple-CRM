import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartItem, PieController, ArcElement, Tooltip } from 'chart.js/auto';
import { OrdersService } from '../../../services/orders/orders.service';

Chart.register(PieController, ArcElement);

interface OrderedProduct {
  name: string,
  amount: number
}

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, AfterViewInit {
  ordersDataService = inject(OrdersService);

  products: OrderedProduct[] = [
    { name: 'Quantum Pad', amount: 0 },
    { name: 'Galactic 27C90 Monitor', amount: 0 },
    { name: 'Fusion Beats Headphones', amount: 0 },
    { name: 'Charging Station', amount: 0 },
    { name: 'Nova Smartwatch', amount: 0 },
    { name: 'Photon Keyboard', amount: 0 },
    { name: 'Electron Mouse', amount: 0 },
    { name: 'Nebula Webcam', amount: 0 },
    { name: 'Bangsen Speaker', amount: 0 },
    { name: 'Vortex E-Reader', amount: 0 },
    { name: 'Solar Power Bank', amount: 0 },
    { name: 'TecAir Earbuds', amount: 0 },
  ]

  mostSoldProducts: OrderedProduct[] = [];

  data = {
    labels: [] as string[],
    datasets: [{
      label: 'Products sold',
      data: [] as number[],
      backgroundColor: [
        'rgb(63, 81, 181)',
        'rgb(87, 109, 234)',
        'rgb(149, 161, 234)'
      ],
      hoverOffset: 4
    }]
  };

  @ViewChild('pieChart') pieChartElementRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit() {
    this.setOrders();
  }

  ngAfterViewInit() {
    this.renderChart();
  }

  renderChart() {
    const chartContext: ChartItem = this.pieChartElementRef.nativeElement;

    new Chart(chartContext, { type: 'pie', data: this.data });
  }

  setOrders() {
    this.ordersDataService.orders.forEach(order => {
      order.products.forEach(productSold => {
        this.products.forEach(product => {
          if (productSold.name === product.name) {
            product.amount += productSold.amount;
          }
        })
      })
    });
    
    this.sortOrders();
  }

  sortOrders() {
    this.products.sort((a, b) => b.amount - a.amount);
    for (let i = 0; i <= 4; i++) {
      const product: OrderedProduct = this.products[i];
      this.mostSoldProducts.push({ name: product.name, amount: product.amount });
    }
    
    this.setData();
  }

  setData() {
    this.mostSoldProducts.forEach(product => {
      this.data.labels.push(product.name);
      this.data.datasets[0].data.push(product.amount);
    })
  }
}
