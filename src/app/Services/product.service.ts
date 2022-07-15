import { Injectable } from '@angular/core';
import { DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private MyCrud:CRUDService) { 
    
  }

  getAllProducts():Observable<DocumentChangeAction<Product>[]>{
    return this.MyCrud.getAll('products') }



  getByID(PrdID:string):Observable<Product>{
      return this.MyCrud.getByID('products',PrdID)
    }

  addNewPrd(NewPrd:Product):  Promise<boolean>{
    // return this.MyCrud.addNewDoc('products',NewPrd)
    return new Promise((resolve)=>{
        this.MyCrud.addNewDoc('products',NewPrd).then(()=>{
      console.log('added successfully');
      resolve(true);
    }).catch((err)=>{console.log(err);
    })
  })
}

  deletePrd(PrdID:string): Promise<void>{
    return  new Promise((resolve)=>{
      this.MyCrud.deleteDoc('products',PrdID).then(()=>{
      resolve();
    })
  })
  }


  updatePrd(PrdID:string, UpdatedPrd:Product): Promise<void>
  {
    // return this.MyCrud.updateDoc('products',PrdID,UpdatedPrd)
    return new Promise((resolve)=>{
      this.MyCrud.updateDoc('products',PrdID,UpdatedPrd).then(()=>{
        resolve();
  }).catch((err)=>{console.log(err)})
    })
  }

}

