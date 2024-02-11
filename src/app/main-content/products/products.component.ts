import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Product } from '../../models/product.interface';
import { MatTooltipModule } from '@angular/material/tooltip';


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
export class ProductsComponent implements AfterViewInit {
  products: Product[] = [
    { name: 'Quantum Pad', status: 'active', inventory: 81, price: 295.90, imageUrl: '' },
    { name: 'Galactic 27C90 Monitor', status: 'active', inventory: 26, price: 89.90, imageUrl: '' },
    { name: 'Fusion Beats Headphones', status: 'archived', inventory: 45, price: 170.50, imageUrl: '' },
    { name: 'Charging Station', status: 'draft', inventory: 60, price: 120.00, imageUrl: '' },
    { name: 'Nova Smartwatch', status: 'active', inventory: 30, price: 259.90, imageUrl: '' },
    { name: 'Photon Keyboard', status: 'active', inventory: 108, price: 115.00, imageUrl: '' },
    { name: 'Electron Mouse', status: 'draft', inventory: 90, price: 49.90, imageUrl: '' },
    { name: 'Nebula Webcam', status: 'active', inventory: 24, price: 99.90, imageUrl: '' },
    { name: 'Bangsen Speaker', status: 'archived', inventory: 75, price: 199.90, imageUrl: '' },
    { name: 'Vortex E-Reader', status: 'active', inventory: 20, price: 130.00, imageUrl: '' },
    { name: 'Solar Power Bank', status: 'draft', inventory: 55, price: 49.95, imageUrl: '' },
    { name: 'TecAir Earbuds', status: 'active', inventory: 52, price: 85.50, imageUrl: '' }
  ];

  displayedColumns: string[] = ['image', 'product', 'status', 'inventory', 'price', 'edit'];
  dataSource = new MatTableDataSource<Product>(this.products);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
