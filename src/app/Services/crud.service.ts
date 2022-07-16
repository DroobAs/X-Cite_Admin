import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CRUDService {

  constructor( private fs: AngularFirestore
             , private storage: AngularFireStorage) { }

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

  addNewDocWithImg(collectionName:string, newData:any, path:string, propertyName:string): Promise<void>
  {
    return new Promise((resolve)=>{
      this.uploadImg(newData[propertyName], path).then((res)=>{
          newData[propertyName] = res;
          this.fs.collection(`${collectionName}`).add(newData).then(()=>{
            resolve();
          })
      })
    });
  }

  updateDoc(collectionName:string, docID:string, Updatedata:any): Promise<void>
  {
    return this.fs.doc(`${collectionName}/${docID}`).update(Updatedata);
  }

  deleteDoc(collectionName:string, docID:string): Promise<void>
  {
    return this.fs.doc(`${collectionName}/${docID}`).delete();
  }

//===== storage CRUD ============================================
  uploadImg(img:File, path:string) : Promise<string>
  {
    return new Promise((resolve)=>{
      this.storage.upload(path +Math.random()+ img.name, img).then((res)=>{
          res.ref.getDownloadURL().then((result)=>{
            console.log(result);
            resolve(result);
            });
      })
    })
  }

  updateImg(img: File, path:string) :Promise<string>
  {
    return new Promise((resolve)=>{
      this.storage.refFromURL(path).put(img).then((res)=>{
        res.ref.getDownloadURL().then((url)=>{
            resolve(url);
        })
      })
    })
  }

  deleteImg(path:string) :Observable<any>
  {
    return this.storage.refFromURL(path).delete()
  }
}