import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Customer } from '../../../models/customer.interface';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MessageAnimationComponent } from '../../../shared/components/message-animation/message-animation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    provideNativeDateAdapter()
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatCardModule,
    MessageAnimationComponent,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    MatProgressSpinnerModule
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
    timestamp: new Date(),
    imageUrl: ''
  };

  date!: Date;
  isLoading = false;
  showError = false;
  showSuccess = false;
  loadingStatus: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';

  firestore = inject(FirestoreService);
  dialogRef = inject(MatDialogRef<CustomerDialogComponent>);
  storageService = inject(StorageService);

  saveCustomer() {
    this.isLoading = true;
    if (this.date) {
      this.customer.birthDate = this.formatDate(this.date);
    }
    this.firestore.addDocument('customers', this.getCleanObject(this.customer))
      .then(() => {
        this.addCustomerResolved();
      })
      .catch((e) => {
        this.errorHandlingAddCustomer();
      });
  }

  formatDate(date: Date): string {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
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
      timestamp: object.timestamp,
      imageUrl: object.imageUrl
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

  async onImageSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      try {
        this.loadingStatus = 'uploading';
        const downloadUrl = await this.storageService.uploadImage(file);
        this.customer.imageUrl = downloadUrl;
        this.loadingStatus = 'success';
      } catch(e) {
        this.loadingStatus = 'fail';
        setTimeout(() => {
          this.loadingStatus = 'initial';
        }, 1800);
      }
    }
  }
}
