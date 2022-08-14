import { Component, OnInit } from '@angular/core';
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
  sellersList: Seller[] | any;
  orderList:Order[]| any
  constructor(private users: UserService,private _order:OrdersService) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllOrders()
  }
  getAllUsers() {
    this.users.getAllUsers().subscribe((data) => {
      this.sellersList = data.map((s) => {
        return {
          id: s.payload.doc.id,
          ...s.payload.doc.data(),
        };
      });
    });
  }
  getAllOrders() {
    this._order.getAllOrders().subscribe((data) => {
      this.orderList = data.map((s) => {
        return {
          id: s.payload.doc.id,
          ...s.payload.doc.data(),
        };
      });
    });
  }
}

