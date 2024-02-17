import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Unsubscribe } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { FirestoreService } from '../../../services/firestore/firestore.service';
import { Customer } from '../../../models/customer.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SummaryCardComponent } from './summary-card/summary-card.component';
import { SummaryItem } from '../../../models/summary-item.interface';
import { Product } from '../../../models/product.interface';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [
    SummaryCardComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './summary-cards.component.html',
  styleUrl: './summary-cards.component.scss'
})
export class SummaryCardsComponent implements OnInit, OnDestroy {
  customersAmount!: number;
  inventoryAmount!: number;
  unsubCustomers!: Unsubscribe;
  customersSubscription!: Subscription;
  unsubProducts!: Unsubscribe;
  productsSubscription!: Subscription;

  isLoading = false;

  firestore = inject(FirestoreService);
  ordersDataService = inject(OrdersService);

  summaryItems: SummaryItem[] = [
      { title: 'customers', amount: this.customersAmount, icon: 'person', route: '/customers', link: 'View all customers' },
      { title: 'orders', amount: this.ordersDataService.orders.length, icon: 'shopping_cart', route: '/orders', link: 'View all orders' },
      { title: 'revenue', amount: this.getRevenue(), icon: 'attach_money', route: '/orders', link: 'See details' },
      { title: 'inventory', amount: this.inventoryAmount, icon: 'inventory_2', route: '/products', link: 'See details' },
  ];

  getRevenue(): number {
    let revenue = 0;
    this.ordersDataService.orders.forEach(order => {
      revenue += order.revenue;
    })
    return revenue;
  }

  ngOnInit() {
    this.isLoading = true;
    this.loadCustomersData();
    this.loadInventoryData();
    this.isLoading = false;
  }

  loadCustomersData() {
    this.unsubCustomers = this.firestore.snapshotCustomers();
    this.customersSubscription = this.firestore.customers$.subscribe((customers: Customer[]) => {
      this.customersAmount = customers.length;
      this.assignData('customers');
    })
  }

  getPropertyName(target: string): number {
    switch (target) {
      case 'customers':
        return this.customersAmount;
      case 'inventory': 
        return this.inventoryAmount;
      default:
        return 0;
    }
  }

  assignData(target: string) {
    const targetAmount = this.getPropertyName(target);

    for (const item of this.summaryItems) {
      if (Object.values(item).includes(target)) {
        item.amount = targetAmount;
      }
    }
  }

  loadInventoryData() {
    this.unsubProducts = this.firestore.snapshotProducts();
    this.productsSubscription = this.firestore.products$.subscribe((products: Product[]) => {
      let inventory = 0;
      products.forEach(product => {
        inventory += product.inventory;
      })
      this.inventoryAmount = inventory;
      this.assignData('inventory');
    })
  }

  ngOnDestroy(): void {
    this.unsubCustomers();
    this.customersSubscription.unsubscribe();
    this.unsubProducts();
    this.productsSubscription.unsubscribe();
  }
}

