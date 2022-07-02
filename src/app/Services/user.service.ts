import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {addDoc,
       getDoc,
       getDocs,
       deleteDoc,
       updateDoc ,
       collection,
       getFirestore} from "@angular/fire/firestore";
import {AngularFirestore , AngularFirestoreCollection} from "@angular/fire/compat/firestore"
import { Observable } from 'rxjs';

import { Seller } from '../Models/seller';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Database } from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
              ) {

  }
  


}
