import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Category } from '../Models/category';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
items:Category[]=[]

  constructor(

    private fs:  AngularFirestore,
    private CRUD : CRUDService) { 


  }
  getAllCat():AngularFirestoreCollection<Category>{
      return this.fs.collection('Categories')
      // return this.fs.collection('category').valueChanges()
  }
  getAllAttributes(id:string, catName:string):AngularFirestoreCollection<Category>{
      return this.fs.collection('Categories').doc(id).collection(catName)
      // return this.fs.collection('category').valueChanges()
  }
  update(data: any, id: any): Promise<void> {
    return this.fs.collection('Categories').doc(id).update(data);
  }
  updateImage(data:any|File, id: any): Promise<void> {
    return this.fs.collection('Categories').doc(id).update({img:data});
  }
  create(cat: Category): any {
    return this.fs.collection('Categories').add({ ...cat });
  }
  // addDocWithSpecificId(cat:string, docId:string, data:any)
  // {
  //   return this.fs.collection(`${cat}`).doc(`${docId}`).set(data)
  // }
  addCollectionInDoc(cat:string, docId:string, newCat:string, newDocID:string, newData:any)
  {
    return this.fs.collection(`${cat}`).doc(`${docId}`).collection(`${newCat}`).doc(`${newDocID}`).set(newData);
  }
  delete(id: any): Promise<void> {
    console.log(id)
    return this.fs.collection('Categories').doc(id).delete();
  }
  newImage( cat:string ,docID:string, data:any){
    return this.CRUD.UploadImageNew(cat,docID, {img:data}, 'Categories', 'img')
  }
  addToCategory( cat:string ,docID:string, data:any){
    return this.CRUD.setNewDocWithImg_SpecificID(cat,docID, data, 'Categories', 'img')
  }
}
