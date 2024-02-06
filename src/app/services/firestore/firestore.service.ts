import { inject, Injectable } from '@angular/core';
import { DocumentData, Firestore, onSnapshot, orderBy, query } from '@angular/fire/firestore';
import { addDoc, collection, doc, DocumentReference } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Customer } from '../../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  private collectionSubject = new BehaviorSubject<Customer[]>([]);
  collection = this.collectionSubject.asObservable();

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
        customerCollection.push(this.setCustomerObject(customer.data()));
      })
      this.collectionSubject.next(customerCollection);
    }, (error) => {
      console.error('loading data failed: ', error);
    }
    )
  }

  setCustomerObject(customer: any): Customer {
    return {
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        birthDate: customer.birthDate,
        address: customer.address,
        zip: customer.zip,
        city: customer.city,
        timestamp: customer.timestamp
    }
  }
}
