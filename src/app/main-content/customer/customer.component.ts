import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerDialogComponent } from './customer-dialog/customer-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Customer } from '../../models/customer.interface';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Unsubscribe } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    CustomerDialogComponent,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit, AfterViewInit, OnDestroy {
  customers: Customer[] = [];

  displayedColumns: string[] = ['image', 'firstName', 'lastName', 'address', 'city', 'birthdate', 'email', 'edit'];
  dataSource = new MatTableDataSource<Customer>(this.customers)

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  unsubCustomers!: Unsubscribe;
  unsubCollection!: Subscription;

  constructor(
    public dialog: MatDialog,
    private firestore: FirestoreService,
    private router: Router,
    ) { }

  openDialog() {
    this.dialog.open(CustomerDialogComponent);
  }

  ngOnInit() {
    // this.unsubCustomers = this.firestore.snapshotCustomers();
    // this.unsubCollection = this.firestore.customers$.subscribe(customerArr => {
    //   this.customers = customerArr;
    //   this.refreshTable();
    // })
  }

  refreshTable() {
    this.dataSource.data = this.customers;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.unsubCustomers();
    this.unsubCollection.unsubscribe();
  }

  editCustomer(customer: Customer) {
    this.router.navigate(['customers/edit/' + customer.id]);
  }
}
