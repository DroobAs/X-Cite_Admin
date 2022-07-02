import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import {AngularFireDatabase } from "@angular/fire/compat/database"

import { getDocs, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Seller } from '../Models/seller';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  sellers: Seller[] = [];

  private httpOption = {};

  constructor(private fs: Firestore, private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  addNewSeller(data: Seller) {
    return this.http.post<Seller>(`${environment.pasaUrl}seller.json`, data);
  }
  getAllSeller() {
    return this.http.get<Seller[]>(`${environment.pasaUrl}/seller.json`).pipe(
      map((res) => {
        const sellerAraay = [];
        for (const key in res) {
          sellerAraay.push({ ...res[key], id: key });
        }
        return sellerAraay;
      })
    );
  }
}
