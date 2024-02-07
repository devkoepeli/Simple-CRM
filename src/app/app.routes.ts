import { Routes } from '@angular/router';
import { CustomerEditComponent } from './main-content/customer-edit/customer-edit.component';
import { CustomerComponent } from './main-content/customer/customer.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'customers', component: CustomerComponent },
    { path: 'customers/edit/:id', component: CustomerEditComponent}
];
