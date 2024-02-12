import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Unsubscribe } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products!: Product[];

  firestoreService = inject(FirestoreService);
  unsubProducts!: Unsubscribe;
  productsSubscription!: Subscription;

  displayedColumns: string[] = ['image', 'product', 'status', 'inventory', 'price', 'edit'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.unsubProducts = this.firestoreService.snapshotProducts();
    this.productsSubscription = this.firestoreService.products$.subscribe(products => {
      this.products = products;
      this.refreshTable();
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.unsubProducts();
    this.productsSubscription.unsubscribe();
  }

  refreshTable() {
    this.dataSource.data = this.products;
    this.dataSource.paginator = this.paginator
  }
}
