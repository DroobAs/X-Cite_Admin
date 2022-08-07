import { Injectable } from '@angular/core';
import { DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  collectionName:string = "Products";

  constructor(private MyCrud:CRUDService) { 
    
  }

  getAllProducts():Observable<DocumentChangeAction<Product>[]>{
    return this.MyCrud.getAll(`${this.collectionName}`) 
  }

  getByID(PrdID:string):Observable<Product>{
      return this.MyCrud.getByID(`${this.collectionName}`,PrdID)
  }

  getProductsByCatsIds(catId:string[]):Observable<DocumentChangeAction<Product>[]>
  {
    return this.MyCrud.getByQuery(this.collectionName, 'categoryName', 'in', catId);
  }

  addNewPrd(NewPrd:Product):  Promise<boolean>{
    // return this.MyCrud.addNewDoc(`${this.collectionName}`,NewPrd)
    return new Promise((resolve)=>{
        this.MyCrud.addNewDoc(`${this.collectionName}`,NewPrd).then(()=>{
      console.log('added successfully');
      resolve(true);
    }).catch((err)=>{console.log(err);
    })
  })
}

  deletePrd(PrdID:string): Promise<void>{
    return  new Promise((resolve)=>{
      this.MyCrud.deleteDoc(`${this.collectionName}`,PrdID).then(()=>{
      resolve();
    })
  })
  }

  updatePrd(PrdID:string, UpdatedPrd:Product): Promise<void>
  {
    // return this.MyCrud.updateDoc(`${this.collectionName}`,PrdID,UpdatedPrd)
    return new Promise((resolve)=>{
      this.MyCrud.updateDoc(`${this.collectionName}`,PrdID,UpdatedPrd).then(()=>{
        resolve();
  }).catch((err)=>{console.log(err)})
    })
  }

}

