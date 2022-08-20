import { Component, OnInit } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'app/Models/admin';
import { AdminService } from 'app/Services/admin.service';
import { object } from 'rxfire/database';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  Add:boolean = true;
  currentAdmin:Admin = {}as Admin;
  done:boolean = false;
  loading:boolean=false;
  adminForm!:FormGroup;

  constructor(  private afAuth: AngularFireAuth
              , private formBuilder: FormBuilder
              , private adminService: AdminService
              , private router:Router
              , private activatedRoute: ActivatedRoute
              , private auth:Auth
              ) { }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      phone: ['',[Validators.required, Validators.pattern('[0-9]{11}')]],
      email:['', [Validators.required, Validators.pattern(/^[A-Z0-9.]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]],
      password:['', [Validators.required, Validators.minLength(7)]]
    })

    this.afAuth.onAuthStateChanged((res)=>{
        console.log(res);
        if (res) {
          this.adminService.getCurrentAdmin(res.uid).subscribe((Res)=>{
            this.currentAdmin = {
              ...Res,
              id: res.uid
            }
            console.log(Res);
            console.log(this.currentAdmin);
            if(!this.Add)
            {
                this.adminForm.patchValue({
                name: this.currentAdmin.name,
                email: this.currentAdmin.email,
                phone: this.currentAdmin.phone,
                password: this.currentAdmin.password
              })
            }
          })
        }
    })

    this.activatedRoute.paramMap.subscribe((res)=>{
      console.log(res.get('id'));
      
      if(res.get('id'))
      {
        this.Add=false;
      }
      else
      {
        this.Add=true;
      }
    })

    
  }

  get namePro()
  {
    return this.adminForm.get('name');
  }
  get phonePro()
  {
    return this.adminForm.get('phone');
  }
  get emailPro()
  {
    return this.adminForm.get('email');
  }
  get passwordPro()
  {
    return this.adminForm.get('password');
  }

  SaveAdmin()
  {
    this.loading = true;
    let admin = {
      name: this.namePro?.value,
      email: this.emailPro?.value,
      phone: this.phonePro?.value,
      password: this.passwordPro?.value
    }

    if (this.Add) {
      let current:Admin = Object(this.currentAdmin);
      this.adminService.addNewAdmin(admin).then((res)=>{
        console.log(current);
        console.log(this.currentAdmin);
        this.adminService.logOut()
             
        this.afAuth.signInWithEmailAndPassword(current.email,current.password).then(()=>{
          this.adminService.logIn(current.email, current.password, current.id as string);
          console.log(res);
          this.saved();
        })
      })
    } else {
      this.adminService.updateAdmin(this.currentAdmin.id as string, admin).then((res)=>{
        console.log(res);
        this.saved();
      })
    }

  }

  saved()
  {
      this.done = true;
      this.loading = false;
      this.adminForm.reset();
      setTimeout(()=>{
        this.router.navigate(['Profile']).then(()=>{
          location.reload()
        })
      },2000)
  }
}
