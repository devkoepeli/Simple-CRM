import { Component } from '@angular/core';
import { OrdersTableComponent } from './orders-table/orders-table.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    OrdersTableComponent
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
