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
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerDeleteDialogComponent } from './customer-delete-dialog/customer-delete-dialog.component';
import { ParamsIdService } from '../../services/params-id/params-id.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MessageAnimationComponent } from '../../shared/components/message-animation/message-animation.component';
import { Storage, getStorage, ref } from '@angular/fire/storage';
import { getDownloadURL, uploadBytes, UploadResult } from '@firebase/storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-edit',
  providers: [provideNativeDateAdapter()],
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

  storage = inject(Storage)
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
    } catch(e) {
      this.savingError();
    }
  }

  async savingSuccess() {
    if (this.customer.birthDate instanceof Date) {
      this.customer.birthDate = this.customer.birthDate.toISOString().slice(0, 10);
    }
    await this.firestore.updateDocument('customers', this.customer);
    this.isSaving = false;
    this.isSuccess = true;
    setTimeout(() => {
      this.isSuccess = false;
    }, 1800);
  }

  savingError() {
    this.isSaving = false;
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1800);
  }

  async uploadImage(event: any) {
    const file: File = event.target.files[0];
    const fileName = `images/${file.name}`

    const storageRef = this.storageRef(fileName);

    if (file) {
      this.loadingStatus = 'uploading';
      try {
        const uploadResult = await uploadBytes(storageRef, file);
        this.downloadUrl(uploadResult);
      } catch(e) {
        this.loadingStatus = 'fail';
      }
    }
  }

  async downloadUrl(uploadResult: UploadResult) {
    const downloadUrl = await getDownloadURL(uploadResult.ref);
    this.customer.imageUrl = downloadUrl;
    this.loadingStatus = 'success';
  }

  storageRef(fileName: string) {
    const storage = getStorage();
    const storageRef = ref(storage, fileName);
    return storageRef;
  }
}
