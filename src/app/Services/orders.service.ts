import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Order } from '../Models/order';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  colletionName:string = "Orders";
  constructor( private curd: CRUDService) {}
  
  getAllOrders(): Observable<DocumentChangeAction<Order>[]>
  {
    return this.curd.getAll(this.colletionName);
  }
  getOrderById(id:string):Observable<Order>
  {
    return this.curd.getByID(this.colletionName, id)
  }
  updateOrderState(docId:string, updatedData:Order):Promise<void>
  {
    return this.curd.updateDoc(this.colletionName, docId, updatedData)
  }
}