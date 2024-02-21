import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';
import { CustomerEditComponent } from './main-content/customer-edit/customer-edit.component';
import { CustomerComponent } from './main-content/customer/customer.component';
import { DashboardComponent } from './main-content/dashboard/dashboard.component';
import { OrdersComponent } from './main-content/orders/orders.component';
import { ProductEditComponent } from './main-content/products/product-edit/product-edit.component';
import { ProductsComponent } from './main-content/products/products.component';

export const routes: Routes = [
    { 
        path: '', 
        component: ContentComponent, 
        children: [
            { path: '', component: DashboardComponent },
            { path: 'customers', component: CustomerComponent },
            { path: 'customers/edit/:id', component: CustomerEditComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'products/edit/:id', component: ProductEditComponent },
            { path: 'orders', component: OrdersComponent },
        ]
    },
    { path: 'login', component: LoginComponent }
];
