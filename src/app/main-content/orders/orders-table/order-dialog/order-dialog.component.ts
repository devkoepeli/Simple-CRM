import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../../../../models/order.interface';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-order-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './order-dialog.component.html',
  styleUrl: './order-dialog.component.scss'
})
export class OrderDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Order) { }
  dialogRef = inject(MatDialogRef<OrderDialogComponent>);

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

  closeDialog() {
    this.dialogRef.close();
  }
}
