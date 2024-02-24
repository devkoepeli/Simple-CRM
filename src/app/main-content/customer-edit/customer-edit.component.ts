import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/firestore';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from '../../models/customer.interface';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerDeleteDialogComponent } from './customer-delete-dialog/customer-delete-dialog.component';
import { ParamsIdService } from '../../services/params-id/params-id.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MessageAnimationComponent } from '../../shared/components/message-animation/message-animation.component';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-customer-edit',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de'},
    provideNativeDateAdapter()
  ],
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    RouterLink,
    MatTooltip,
    MessageAnimationComponent,
    CommonModule
  ],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.scss'
})
export class CustomerEditComponent implements OnInit, OnDestroy {
  customer!: Customer;
  customerId!: string;
  unsubCustomer!: Unsubscribe;
  unsubCustomerData!: Subscription;

  isLoading = false;
  isSaving = false;
  isSuccess = false;
  isError = false;

  date!: Date;

  storageService = inject(StorageService);
  loadingStatus: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    public dialog: MatDialog,
    private paramsId: ParamsIdService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe(params => {
      this.customerId = params['id'];
      this.paramsId.setId(this.customerId);
      this.unsubCustomer = this.firestore.snapshotCustomer(this.customerId);
    })
    this.unsubCustomerData = this.firestore.customerSubject.subscribe(customer => {
      if (customer) {
        this.customer = customer;
        this.isLoading = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.unsubCustomer();
    this.unsubCustomerData.unsubscribe();
  }

  openDialog() {
    this.dialog.open(CustomerDeleteDialogComponent);
  }

  updateCustomer() {
    this.isSaving = true;
    try {
      this.savingSuccess();
    } catch (e) {
      this.savingError();
    }
  }

  async savingSuccess() {
    if (this.customer.birthDate instanceof Date) {
      this.customer.birthDate = this.formatDate(this.customer.birthDate);
    }
    await this.firestore.updateDocument('customers', this.customer);
    this.isSaving = false;
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 1800);
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

  savingError() {
    this.isSaving = false;
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
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
      } catch (e) {
        this.loadingStatus = 'fail';
      }
    }
  }
}
