import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { ParamsIdService } from '../../../services/params-id/params-id.service';
import { MessageAnimationComponent } from '../../../shared/components/message-animation/message-animation.component';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-customer-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MessageAnimationComponent, MatProgressBarModule],
  templateUrl: './customer-delete-dialog.component.html',
  styleUrl: './customer-delete-dialog.component.scss'
})
export class CustomerDeleteDialogComponent {
  customerId!: string;

  isLoading = false;
  showSuccess = false;
  showError = false;

  constructor(
    private firestore: FirestoreService,
    private paramsId: ParamsIdService,
    public dialogRef: MatDialogRef<CustomerDeleteDialogComponent>,
    private router: Router
  ) { }

  ngOnInit() {
    this.customerId = this.paramsId.getId();
  }

  async deleteCustomer() {
    this.isLoading = true;
    try {
      await this.firestore.deleteDocument('customers', this.customerId);
      this.isLoading = false;
      await this.showSuccessMessage();
      this.router.navigate(['/customers']);
    } catch (err) {
      this.isLoading = false;
      this.showErrorMessage();
    }
  }

  async showSuccessMessage() {
    this.showSuccess = true;
    await new Promise<void>(resolve => setTimeout(() => {
      this.showSuccess = false;
      this.dialogRef.close();
      resolve();
    }, 1800));
  }

  showErrorMessage() {
    this.showError = true;
    setTimeout(() => {
      this.showError = false;
      this.dialogRef.close();
    }, 1800);
  }
}
