import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { where, WhereFilterOp } from 'firebase/firestore';
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

  getByQuery(collectionName:string, fieldName:string, condition:WhereFilterOp, target:any):Observable<DocumentChangeAction<any>[]>
  {
    return this.fs.collection(collectionName, ref=> ref.where(fieldName, condition, target)).snapshotChanges();
  }

  getCollectionGroub(collectionName:string):Observable<DocumentChangeAction<any>[]>
  {
    return this.fs.collectionGroup(`${collectionName}`).snapshotChanges();
  }

  addNewDoc(collectionName:string, newData:any) : Promise<DocumentReference<any>>
  {
    return this.fs.collection(`${collectionName}`).add(newData)
  }


  addSubCollectionInSpecificDoc(collectionName:string, docId:string, newSubCollectionID:string) : Promise<DocumentReference<any>>
  {
    return this.fs.collection(`${collectionName}`).doc(`${docId}`).collection(`${newSubCollectionID}`).add({});
  }

  addNewDocWithImg(collectionName:string, newData:any, path:string, propertyName:string): Promise<void>
  {
    return new Promise((resolve)=>{
      this.uploadImg(newData[propertyName], path).then((res)=>{
          newData[propertyName] = res;
          this.addNewDoc(collectionName, newData).then(()=>{
            resolve();
          })
      })
    });
  }
  
  setNewDocWithImg_SpecificID(collectionName:string, docId:string, newData:any, path:string, propertyName:string): Promise<void>
  {
    return new Promise((resolve)=>{
      this.uploadImg(newData[propertyName], path).then((res)=>{
          newData[propertyName] = res;
          this.addDocWithSpecificId(collectionName, docId, newData).then(()=>{
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

  addDocWithSpecificId(collectionName:string, docId:string, data:any):Promise<void>
  {
    return this.fs.collection(`${collectionName}`).doc(`${docId}`).set(data);
  }
// George Upload new Image
  newImage(cat:string, docId:string, data:any)
  {
    return this.fs.collection(`${cat}`).doc(`${docId}`).update(data);
  }
  // George Upload new Image
UploadImageNew(collectionName:string, docId:string, newData:any, path:string, propertyName:string): Promise<void>
{
  return new Promise((resolve)=>{
    this.uploadImg(newData[propertyName], path).then((res)=>{
        newData[propertyName] = res;
        this.newImage(collectionName, docId, newData).then(()=>{
          resolve();
        })
    })
  });
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