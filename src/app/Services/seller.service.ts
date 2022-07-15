import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';

// import {AngularFireDatabase } from "@angular/fire/compat/database"

import { getDocs, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Seller } from '../Models/seller';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  sellers: Seller[] = [];

  private httpOption = {};

  constructor(
    private fs: Firestore,
    private http: HttpClient,
    private curd: CRUDService
  ) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAllSellers(): Observable<DocumentChangeAction<Seller>[]> {
    return this.curd.getAll('Sellers');
    // getAllSeller() {
    //   return this.http.get<Seller[]>(`${environment.pasaUrl}/seller.json`).pipe(
    //     map((res) => {
    //       const sellerAraay = [];
    //       for (const key in res) {
    //         sellerAraay.push({ ...res[key], id: key });
    //       }
    //       return sellerAraay;
    //     })
    //   );
    // }
  }
  addNewSeller(data: Seller) {
    return this.curd.addNewDoc('Sellers', data);
    //this.http.post<Seller>(`${environment.pasaUrl}seller.json`, data);
  }
  getSellerbyID(id:string){
      return this.curd.getByID("Sellers", id)
  }
  // update seller
  updateSeller(id: string , data:Seller){
    return this.curd.updateDoc("Sellers", id, data)
  }
  deleteSeller(id: string): Promise<any> {
    return this.curd.deleteDoc('Sellers', id);
  // return this.http.delete<Seller>(`${environment.pasaUrl}seller/${id}.json`, this.httpOption)
  }
}
