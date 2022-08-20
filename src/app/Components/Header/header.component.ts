import {  Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Admin } from 'app/Models/admin';
import { AdminService } from '../../Services/admin.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentAdmin:Admin={}as Admin;

  constructor(private authAdmin: AdminService,
              private router:Router
              , private afAuth:AngularFireAuth ) { 

                
              }

  @Output() openAndClose: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((res)=>{
      console.log(res);
      this.authAdmin.getCurrentAdmin(res?.uid as string).subscribe((Res)=>{
          console.log(Res);
          this.currentAdmin = {
            ...Res,
            id: res?.uid
          }
        })
        // this.afAuth.currentUser.then((res)=>{
        //   this.authAdmin.getCurrentAdmin(res?.uid as string).subscribe((Res)=>{
        //     console.log(Res);
        //     this.currentAdmin = {
        //       ...Res,
        //       id: res?.uid
        //     }
        //   })
        // })
    })
  }
  change()
  {

  }


  toggleSideBar(){
      this.openAndClose.emit()
  }
  logOut(){
      this.authAdmin.logOut()
      this.router.navigate(['/Login'])
  }
  // diasjfiosdhfo

}
