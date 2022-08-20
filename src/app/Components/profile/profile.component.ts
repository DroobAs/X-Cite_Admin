import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { Admin } from 'app/Models/admin';
import { AdminService } from 'app/Services/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  admins:Admin[]=[];
  curAdmin:Admin={} as Admin;

  constructor(  private afAuth: AngularFireAuth
              , private router: Router
              , private adminService: AdminService
              ) { }

  ngOnInit(): void {
    console.log(this.curAdmin);
    
    this.adminService.getAllAdmins().subscribe((res)=>{
      this.admins = res.map(item=> item.payload.doc.data())
    })
    this.afAuth.onAuthStateChanged((res)=>{
        console.log(res?.uid);
        this.adminService.getCurrentAdmin(res?.uid as string).subscribe((Res)=>{
          console.log(Res);
          this.curAdmin = {
            ...Res,
            id: res?.uid
          }
          
        })
    })
  }



  goToEditAdmin(id:string | undefined)
  {
    this.router.navigate([`SaveAdmin/${id}`]);
  }

  goToAddNew()
  {
    this.router.navigate(['SaveAdmin']);
  }

}