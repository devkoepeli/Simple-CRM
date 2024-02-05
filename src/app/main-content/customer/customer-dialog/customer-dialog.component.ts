import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../../models/customer.interface';


@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss'
})
export class CustomerDialogComponent {
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: 0,
    address: '',
    town: ''
  };

  date!: Date;

  constructor() {}

  saveCustomer() {
    if (this.date) {
      this.customer.birthDate = this.date.getTime();
    }
    console.log(this.customer);
  }
}
