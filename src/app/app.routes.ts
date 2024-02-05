import { Routes } from '@angular/router';
import { CustomerComponent } from './main-content/customer/customer.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'customer', component: CustomerComponent }
];
