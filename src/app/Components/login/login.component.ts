import { Component, Inject, OnInit } from '@angular/core';
import { Auth , signInWithEmailAndPassword } from '@angular/fire/auth';
import { AdminService } from '../../Services/admin.service';
import { Router } from '@angular/router';
import {Database , ref , getDatabase , set  } from "@angular/fire/database"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  massage:string| null = null;
  isAdminLogged: boolean = false
  constructor(  private auth:Auth,
                private authLog:AdminService,
                private route:Router
                ) { }

  ngOnInit(): void {
  }
  adminLogIN(value: any){

    signInWithEmailAndPassword(this.auth , value.email, value.password).then((res)=> {
      // console.log(res.user.uid);
      this.massage=null;
      this.authLog.logIn(value.email, value.password, res.user.uid);
      this.isAdminLogged = this.authLog.getIsAdminLogged
      this.route.navigate(["/Home"])

    }).catch((err)=> {
      // console.log(err);
      // this.massage = err
      this.massage = "* Wrong Email or Password!"
    })
  }
}
