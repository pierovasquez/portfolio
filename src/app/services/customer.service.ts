import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerI } from './../components/models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerCollection: AngularFirestoreCollection<CustomerI>;
  public customers: Observable<CustomerI[]>;

  constructor(
    private readonly afs: AngularFirestore
  ) {
    this.customerCollection = afs.collection<CustomerI>('customers');
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CustomerI;
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    )
  }

  getAllCustomers() {
    return this.customers;
  }
}
