import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Order } from '../../../models/order.interface';
import { OrdersService } from '../../../services/orders/orders.service';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';


@Component({
  selector: 'app-orders-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss'
})
export class OrdersTableComponent implements OnInit {
  ordersDataService = inject(OrdersService);
  orders!: Order[];

  isOrderOpen = false;
  dialog = inject(MatDialog);

  displayedColumns: string[] = ['id', 'date', 'customer', 'products', 'revenue', 'status'];
  dataSource = new MatTableDataSource<Order>(this.orders);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.orders = this.ordersDataService.orders;
    this.refreshTableData(); 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  refreshTableData() {
    this.dataSource.data = this.orders;
    this.dataSource.paginator = this.paginator;
  }

  openDialog(order: Order) {
    this.dialog.open(OrderDialogComponent, { data: order });
  }

}
