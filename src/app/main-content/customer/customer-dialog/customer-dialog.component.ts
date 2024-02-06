import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../../models/customer.interface';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

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
    MatDatepickerModule,
    MatProgressBarModule,
    MatCardModule
  ],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss'
})
export class CustomerDialogComponent {
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    address: '',
    city: '',
    timestamp: new Date()
  };

  date!: Date;
  isLoading = false;
  showError = false;
  showSuccess = false;

  constructor(
    private firestore: FirestoreService,
    public dialogRef: MatDialogRef<CustomerDialogComponent>,
  ) { }

  saveCustomer() {
    this.isLoading = true;
    if (this.date) {
      this.customer.birthDate = this.date.toISOString().slice(0, 10);;
    }
    this.firestore.addDocument('customers', this.getCleanObject(this.customer))
      .then(() => {
        this.addCustomerResolved();
      })
      .catch((e) => {
        this.errorHandlingAddCustomer();
      });
  }

  getCleanObject(object: Customer) {
    return {
      firstName: object.firstName,
      lastName: object.lastName,
      email: object.email,
      birthDate: object.birthDate,
      address: object.address,
      zip: object.zip,
      city: object.city,
      timestamp: object.timestamp
    }
  }

  addCustomerResolved() {
    this.isLoading = false;
    this.showSuccess = true;
    setTimeout(() => {
      this.showSuccess = false;
      this.dialogRef.close();
    }, 1800);
  }

  errorHandlingAddCustomer() {
    this.showError = true;
    this.isLoading = false;
    setTimeout(() => {
      this.showError = false;
      this.dialogRef.close();
    }, 1800);
  }
}
