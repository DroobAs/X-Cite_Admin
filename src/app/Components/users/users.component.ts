import { Component, OnInit } from '@angular/core';
import { Admin } from 'app/Models/admin';
import { Seller } from 'app/Models/seller';
import { AdminService } from 'app/Services/admin.service';
import { UserService } from 'app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  searchText: string = '';
  usersList: Seller[] | any;
  orderList: [] | any;
  adminsIds:string[]=[];
  constructor(  private users: UserService
              , private adminService:AdminService ) {}

  ngOnInit(): void {
    this.users.getAllUsers().subscribe((data) => {
      this.usersList = data.map((s) => {
        return {
          id: s.payload.doc.id,
          ...s.payload.doc.data()
        };
      });
    });

    this.adminService.getAllAdmins().subscribe((res)=>{
        this.adminsIds = res.map((item)=>item.payload.doc.id)
    })
  }

  addUserToAdmins(_id:string, _name:string, mobile:string, mail:string, pass:string)
  {
    let newAdmin:Admin={
      id: _id,
      name: _name,
      phone: mobile,
      email:mail,
      password: pass
    }
    this.adminService.makeUserAdmin(newAdmin).then((res)=>{
      console.log(res);
      
    })
  }
}
