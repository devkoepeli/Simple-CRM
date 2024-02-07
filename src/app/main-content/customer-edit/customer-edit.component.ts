import { Component, OnDestroy, OnInit } from '@angular/core';
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
    MatTooltip
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

  }
}
