import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Category } from '../Models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  items:Category[]=[]
  collectionName: string = "Categories";

  constructor(private fs:  AngularFirestore) { 


  }
  getAllCat():AngularFirestoreCollection<Category>{
      return this.fs.collection(`${this.collectionName}`)
      // return this.fs.collection('category').valueChanges()
  }
  update(data: any, id: any): Promise<void> {
    return this.fs.collection(`${this.collectionName}`).doc(id).update(data);
  }
  create(cat: Category): any {
    return this.fs.collection(`${this.collectionName}`).add({ ...cat });
  }
  delete(id: any): Promise<void> {
    console.log(id)
    return this.fs.collection(`${this.collectionName}`).doc(id).delete();
  }
}
