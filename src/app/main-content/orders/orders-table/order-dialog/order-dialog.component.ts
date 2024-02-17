import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Order } from '../../../../models/order.interface';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatTableModule
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Order) { }

  displayedColumns: string[] = ['product', 'price', 'revenue'];

  getTotalCost() {
    let price = 0;
    let amount = 0;
    let revenue = 0;
    this.data.products.forEach(product => {
      price = product.price;
      amount = product.amount;
      revenue += price * amount;
    });
    return revenue;
  }
}
