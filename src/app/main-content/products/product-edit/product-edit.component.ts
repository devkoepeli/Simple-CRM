import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.interface';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { ParamsIdService } from '../../../services/params-id/params-id.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { FloatLabelType, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { StorageService } from '../../../services/storage/storage.service';
import { MatSelectModule } from '@angular/material/select';
import { MessageAnimationComponent } from '../../../shared/components/message-animation/message-animation.component';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ProductFormComponent,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    CommonModule,
    MatSelectModule,
    MessageAnimationComponent,
  ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  isLoading = false;
  productId!: string;
  product!: Product;

  productStates = ['active', 'draft', 'archived'];
  statusControl!: FormControl;

  savingStatus: 'initial' | 'saving' | 'success' | 'fail' = 'initial';
  imageStatus: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';

  router = inject(ActivatedRoute);
  firestore = inject(FirestoreService);
  paramsService = inject(ParamsIdService);
  storage = inject(StorageService);

  unsubProduct!: Unsubscribe;
  productSubscription!: Subscription;

  ngOnInit() {
    this.isLoading = true;
    this.router.params.subscribe(params => {
      this.productId = params['id'];
      this.unsubProduct = this.firestore.snapshotProduct(this.productId);
    });
    this.productSubscription = this.firestore.productSubject.subscribe(product => {
      if (product) {
        this.product = product;
        this.statusControl = new FormControl(this.product.status, Validators.required)
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubProduct();
    this.productSubscription.unsubscribe();
  }

  async uploadImage(event: any) {
    const file = event.target.files[0];

    if (file) {
      try {
        this.imageStatus = 'uploading';
        const downloadUrl = await this.storage.uploadImage(file);
        this.product.imageUrl = downloadUrl;
        this.imageStatus = 'success';
        setTimeout(() => {
          this.imageStatus = 'initial';
        }, 1800);
      } catch (e) {
        this.imageStatus = 'fail';
        setTimeout(() => {
          this.imageStatus = 'initial';
        })
      }
    }
  }

  async updateProduct() {
    this.savingStatus = 'saving';
    this.product.status = this.statusControl.value;
    this.statusControl.disable();

    try {
      await this.updatingResolve();
    } catch (e) {
      this.updatingReject();
    }
  }

  async updatingResolve() {
    await this.firestore.updateProduct('products', this.product);
    this.savingStatus = 'success';
    this.statusControl.enable();
    setTimeout(() => {
      this.savingStatus = 'initial';
    }, 1800);
  }

  updatingReject() {
    this.savingStatus = 'fail';
    setTimeout(() => {
      this.savingStatus = 'initial';
    }, 1800);
  }
}
