import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MessageAnimationComponent } from '../../../shared/components/message-animation/message-animation.component';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatProgressBarModule,
    MatCardModule,
    MessageAnimationComponent,
    CommonModule,
    ProductFormComponent
  ],
  templateUrl: './product-dialog.component.html',
  styleUrl: './product-dialog.component.scss'
})
export class ProductDialogComponent {
  addingStatus: 'initial' | 'adding' | 'success' | 'fail' = 'initial';

  receiveAddingStatus($event: 'initial' | 'adding' | 'success' | 'fail') {
    this.addingStatus = $event;
  }
}
