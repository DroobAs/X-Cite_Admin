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

  // addTest()
  // {
  //   return this.MyCrud.addDocWithSpecificId('Categories', 'AsmaaTest', {img:'', discount:4, subcollections:[]})
  // }

  // addSubTest()
  // {
  //   return this.MyCrud.addSubCollectionInSpecificDoc('Categories','AsmaaTest', "AsmaaSubCollection");
  // }

  getAllProducts():Observable<DocumentChangeAction<Product>[]>{
    return this.MyCrud.getAll(`${this.collectionName}`) 
  }

  getByID(PrdID:string):Observable<Product>{
      return this.MyCrud.getByID(`${this.collectionName}`,PrdID)
  }

  getSpecificProductsWithIds(Ids:string[]):Observable<DocumentChangeAction<Product>[]>
  {
    return this.MyCrud.getByGroubIds(this.collectionName, Ids)
  }

  getProductsByCatsIds(catId:string[]):Observable<DocumentChangeAction<Product>[]>
  {
    return this.MyCrud.getByQuery(this.collectionName, 'categoryName', 'in', catId);
  }
  getBrandProducts(brandName:string):Observable<DocumentChangeAction<Product>[]>
  {
    return this.MyCrud.getByQuery(this.collectionName, 'brandName','==', brandName)
  }

  addNewPrd(NewPrd:Product):  Promise<string>{
    return new Promise((resolve)=>{
      this.uploadProImgs(NewPrd).then(()=>{
        this.MyCrud.addNewDoc(`${this.collectionName}`,NewPrd).then((res)=>{
          
        console.log('added successfully');
        resolve(res.id);
        })
      }).catch((err)=>{console.log(err);})
   })
  }
  async uploadProImgs( product:Product) : Promise<void>
  {
      let i = 0;
      while (i < product.images.length)
      {
        await this.MyCrud.uploadImg(product.images[i] as File, 'Products/').then((url)=>{
          product.images[i] = url;  
          i++;
        }).catch((err)=>{console.log(err);})
      }
      if(i== product.images.length)
      {
        return new Promise((resolve)=>{
          resolve();
        })
      }
  }

  deletePrd(PrdID:string, product:Product): Promise<void>{
    return  new Promise((resolve)=>{
      product.images.forEach((img, index)=>{
        this.MyCrud.deleteImg(img as string).subscribe(()=>{
          if(index==product.images.length-1)
          {
            this.MyCrud.deleteDoc(this.collectionName, PrdID).then(()=>{
              resolve();
            })
          }
        })
      })
      if(product.images.length == 0)
      {
        this.MyCrud.deleteDoc(`${this.collectionName}`,PrdID).then(()=>{
        resolve();
        })
      }
    })
  }

  updatePrd(UpdatedPrd:Product, PrdID:string, originProduct:Product ): Promise<void>
  {    
    return new Promise((resolve)=>{
      this.updateProdImgaes(UpdatedPrd, originProduct).then(()=>{
        this.MyCrud.updateDoc(`${this.collectionName}`,PrdID,UpdatedPrd).then(()=>{
          resolve();
        })
      }).catch((err)=>{console.log(err)})
    })
  }

  async updateProdImgaes(product:Product, origin:Product): Promise<void>
  {
    console.log(product, origin);
    let i = 0;
    while (i < product.images.length)
    {      
      console.log('in big while', i);
      while (i<origin.images.length)
      {
        console.log('in first while', i);
        if(typeof(product.images[i]) == 'string')
        {
          i++;
        }
        else
        {
          console.log(product.images[i]);
          console.log(origin.images[i]);
          await this.MyCrud.updateImg(product.images[i] as File, origin.images[i] as string).then((res)=>{
            product.images[i] = res;
                i++;
          }).catch((err)=>{console.log(err);})
        }
      }
      while(i>=origin.images.length && (i<product.images.length))
      {
        console.log('in second while', i);
          await this.MyCrud.uploadImg(product.images[i] as File,'Products/').then((url)=>{
            product.images[i] = url;
              i++;
          }).catch((err)=>{console.log(err);})
      }
    }
    if(i== product.images.length)
    {
      console.log('in return', product.images.length);
      
      return new Promise((resolve)=>{
        resolve();
      })
    }
  }

}