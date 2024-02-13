import { inject, Injectable } from '@angular/core';
import { deleteDoc, DocumentData, Firestore, getDoc, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, doc, DocumentReference } from '@firebase/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { Customer } from '../../models/customer.interface';
import { Product } from '../../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  private customersSubject = new BehaviorSubject<Customer[]>([]);
  customers$ = this.customersSubject.asObservable();

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  customerSubject = new Subject<Customer>();
  productSubject = new Subject<Product>();

  constructor() { }

  async addDocument(colID: string, item: {}) {
    await addDoc(this.getColRef(colID), item);
  }

  getColRef(colID: string) {
    return collection(this.firestore, colID);
  }

  getDocRef(colID: string, docID: string) {
    return doc(this.firestore, colID, docID);
  }

  snapshotCustomers() {
    const q = query(this.getColRef('customers'), orderBy("timestamp", "desc"));
    return onSnapshot(q, customers => {
      const customerCollection: Customer[] = [];
      customers.forEach(customer => {
        customerCollection.push(this.setCustomerObject(customer.data(), customer.id));
      })
      this.customersSubject.next(customerCollection);
    }, (error) => {
      console.error('loading data failed: ', error);
    }
    )
  }

  snapshotCustomer(docId: string) {
    return onSnapshot(this.getDocRef('customers', docId), customer => {
      if (customer.exists()) {
        this.customerSubject.next(this.setCustomerObject(customer.data(), customer.id));
      }
    })
  }

  snapshotProducts() {
    const q = query(this.getColRef('products'), orderBy('timeStamp', 'desc'));
    return onSnapshot(q, products => {
      const productCollection: Product[] = [];
      products.forEach(product => {
        productCollection.push(this.setProductObject(product.data(), product.id));
      });
      this.productsSubject.next(productCollection);
    }, (error) => {
      console.error('loading data failed: ', error);
    })
  }

  snapshotProduct(docId: string) {
    return onSnapshot(this.getDocRef('products', docId), product => {
      if (product.exists()) {
        this.productSubject.next(this.setProductObject(product.data(), product.id));
      }
    })
  }

  async updateDocument(colId: string, item: Customer) {
    if (item.id != undefined) {
      const docRef = this.getDocRef(colId, item.id);
      await updateDoc(docRef, this.getCleanCustomerObject(item));
    }
  }

  async updateProduct(colId: 'products', item: Product) {
    if (item.id != undefined) {
      const docRef = this.getDocRef(colId, item.id);
      await updateDoc(docRef, this.getCleanProductObject(item));
    }
  }

  async deleteDocument(colId: string, docId: string) {
    const docRef = this.getDocRef(colId, docId);
    await deleteDoc(docRef);
  }

  setCustomerObject(customer: any, customerId: string): Customer {
    return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        birthDate: customer.birthDate,
        address: customer.address,
        zip: customer.zip,
        city: customer.city,
        timestamp: customer.timestamp,
        id: customerId,
        imageUrl: customer.imageUrl
    }
  }

  getCleanCustomerObject(customer: Customer) {
    return {
      firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        birthDate: customer.birthDate,
        address: customer.address,
        zip: customer.zip,
        city: customer.city,
        timestamp: customer.timestamp,
        imageUrl: customer.imageUrl
    }
  }

  setProductObject(product: any, productId: string): Product {
    return {
      name: product.name,
      status: product.status,
      inventory: product.inventory,
      price: product.price,
      imageUrl: product.imageUrl,
      timeStamp: product.timeStamp,
      id: productId
    }
  }

  getCleanProductObject(item: Product) {
    return {
      name: item.name,
      status: item.status,
      inventory: item.inventory,
      price: item.price,
      imageUrl: item.imageUrl,
      timeStamp: item.timeStamp
    }
  }
}
