import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private isAdminLoggedSub:BehaviorSubject<boolean>
  constructor() {
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
}