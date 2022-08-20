import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DocumentChangeAction } from '@angular/fire/compat/firestore';
import { Admin } from 'app/Models/admin';
import { BehaviorSubject, Observable } from 'rxjs';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  collectionName:string = "Admins";

  private isAdminLoggedSub:BehaviorSubject<boolean>;

  constructor(  private asAuth:AngularFireAuth
              , private crud:CRUDService ) {
    this.isAdminLoggedSub = new BehaviorSubject<boolean>(this.getIsAdminLogged)
   }
  logIn(emile:string, password:string, accToken:string){

     localStorage.setItem("token", accToken)
     this.isAdminLoggedSub.next(true)
  }
  logOut(){
    localStorage.removeItem("token");
    this.isAdminLoggedSub.next(false)
  }
  get getIsAdminLogged():boolean{
    return (localStorage.getItem("token"))?true : false
  }

  getCurrentAdmin(id:string)
  {
    return this.crud.getByID(this.collectionName, id);
  }

  async addNewAdmin (newAdmin:Admin)
  {
    await this.asAuth.createUserWithEmailAndPassword(newAdmin.email, newAdmin.password).then((res)=>{
        // console.log(res.user?.uid);
        return this.crud.addDocWithSpecificId(this.collectionName, res.user?.uid as string, newAdmin)
        
    })
  }

  makeUserAdmin(newAdmin:Admin)
  {
    return this.crud.addDocWithSpecificId(this.collectionName, newAdmin.id as string, newAdmin) 
  }
  
  getAllAdmins() :Observable<DocumentChangeAction<Admin>[]>
  {
    return this.crud.getAll(this.collectionName);
  }

  updateAdmin(id:string, updatedAdmin:Admin)
  {
    return this.crud.updateDoc(this.collectionName,id, updatedAdmin)
  }


}