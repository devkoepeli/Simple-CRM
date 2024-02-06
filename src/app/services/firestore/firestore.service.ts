import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, DocumentReference } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore: Firestore = inject(Firestore);

  constructor() { }

  async addDocument(colID: string, item: {}) {
    const docRef = await addDoc(this.getColRef(colID), item);
    console.log('item was added successfully', docRef.id);
  }

  getColRef(colID: string) {
    return collection(this.firestore, colID);
  }

  getDocRef(colID: string, docID: string) {
    return doc(this.firestore, colID, docID);
  }
}
