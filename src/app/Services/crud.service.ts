import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor(private fs: AngularFirestore) { }

  getAll(collectionName:string) :Observable<DocumentChangeAction<any>[]>
  {
    return this.fs.collection(`${collectionName}`).snapshotChanges();
  }

  getByID(collectionName:string, docID:string) :Observable<any>
  {
    return this.fs.doc(`${collectionName}/${docID}`).valueChanges();
  }

  addNewDoc(collectionName:string, newData:any) : Promise<DocumentReference<any>>
  {
    return this.fs.collection(`${collectionName}`).add(newData)
  }

  deleteDoc(collectionName:string, docID:string): Promise<void>
  {
    return this.fs.doc(`${collectionName}/${docID}`).delete();
  }

  updateDoc(collectionName:string, docID:string, data:any): Promise<void>
  {
    return this.fs.doc(`${collectionName}/${docID}`).update(data);
  }

}
