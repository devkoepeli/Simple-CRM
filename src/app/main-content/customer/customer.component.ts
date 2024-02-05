import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    CustomerDialogComponent
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(CustomerDialogComponent);
  }
}
