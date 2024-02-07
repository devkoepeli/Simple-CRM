import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsIdService {
  id!: string;

  constructor() { }

  setId(customerId: string) {
    this.id = customerId
  }

  getId() {
    return this.id;
  }
}
