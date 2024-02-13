import { Component, inject, Output, EventEmitter } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StorageService } from '../../../services/storage/storage.service';
import { Product } from '../../../models/product.interface';
import { MatSelectModule } from '@angular/material/select';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { MessageAnimationComponent } from '../../../shared/components/message-animation/message-animation.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ProductFormComponent,
    MessageAnimationComponent,
    MatDialogModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  addingStatus: 'initial' | 'adding' | 'success' | 'fail' = 'initial';
  imageStatus: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';

  @Output() addingStatusEvent = new EventEmitter<'initial' | 'adding' | 'success' | 'fail'>();

  product: Product = {
    name: '',
    status: 'draft',
    inventory: 0,
    price: 0,
    timeStamp: new Date(),
    imageUrl: ''
  }

  formProduct = {
    name: '',
    inventory: '',
    price: '',
  }
  productStates = ['active', 'draft'];
  statusControl = new FormControl(null, Validators.required);

  storage = inject(StorageService);
  firestore = inject(FirestoreService);
  dialogRef = inject(MatDialogRef<ProductDialogComponent>);

  async onImageSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      try {
        this.imageStatus = 'uploading';
        const downloadUrl = await this.storage.uploadImage(file);
        this.product.imageUrl = downloadUrl;
        this.imageStatus = 'success';
      } catch (e) {
        this.imageStatus = 'fail';
        setTimeout(() => {
          this.imageStatus = 'initial';
        }, 1800);
      }
    }
  }

  async saveProduct() {
    const product = {
      ...this.formProduct,
      status: this.statusControl.value,
      timeStamp: this.product.timeStamp,
      imageUrl: this.product.imageUrl
    }

    this.addingStatus = 'adding';
    this.sendAddingStatus();
    this.statusControl.disable();
    try {
      await this.addProduct(product);
    } catch (e) {
      this.addProductRejected();
    }
  }

  async addProduct(product: {}) {
    await this.firestore.addDocument('products', product);
    this.addingStatus = 'success';
    this.sendAddingStatus();
    this.statusControl.enable();
    setTimeout(() => {
      this.addingStatus = 'initial';
      this.sendAddingStatus();
      this.dialogRef.close();
    }, 1800);
  }

  addProductRejected() {
    this.addingStatus = 'fail';
    this.sendAddingStatus();
    this.statusControl.enable();
    setTimeout(() => {
      this.addingStatus = 'initial';
      this.sendAddingStatus();
      this.dialogRef.close();
    }, 1800);
  }

  sendAddingStatus() {
    this.addingStatusEvent.emit(this.addingStatus);
  }
}
