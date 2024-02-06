import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../../models/customer.interface';
import { FirestoreService } from '../../../services/firestore/firestore.service';


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
    city: ''
  };

  date!: Date;

  constructor(private firestore: FirestoreService) { }

  saveCustomer() {
    if (this.date) {
      this.customer.birthDate = this.date.getTime();
    }
    this.firestore.addDocument('customers', this.getCleanObject(this.customer));
  }

  getCleanObject(object: Customer) {
    return {
      firstName: object.firstName,
      lastName: object.lastName,
      email: object.email,
      birthDate: object.birthDate,
      address: object.address,
      zip: object.zip,
      city: object.city
    }
  }
}
