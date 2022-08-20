import { Component, OnInit } from '@angular/core';
import { BrandService } from 'app/Services/brand.service';
import { UserService } from 'app/Services/user.service';
import { Order } from '../../Models/order';

import { Seller } from '../../Models/seller';
import { OrdersService } from '../../Services/orders.service';
import { SellerService } from '../../Services/seller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  usersNumber:number=0;
  orderNumber:number=0;
  totalEarned:number=0;
  brandNumber:number=0;

  constructor(  private users: UserService
              , private _order:OrdersService
              , private brandService:BrandService
              ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllOrders();
    this.getBrandLength();
  }
  getAllUsers() {
    this.users.getAllUsers().subscribe((data) => {
      this.usersNumber = data.length;
    });
  }
  getAllOrders() {
    this._order.getAllOrders().subscribe((data) => {
      this.orderNumber = data.length;
      let total =0;
      data.forEach((ele)=>{
        total += Number(ele.payload.doc.data().totalPaid) 
      })
      this.totalEarned = total;
    });
  }
  getBrandLength()
  {
    this.brandService.getAllBrands().subscribe((res)=>{
      this.brandNumber = res.length;
    })
  }
}

