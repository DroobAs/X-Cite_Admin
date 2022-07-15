import { Component, OnInit } from '@angular/core';
import { Order } from '../../Models/order'
import { OrdersService } from '../../Services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderList: Order[] | any;
  constructor(private order:OrdersService) { }

  ngOnInit(): void {

    this.order.getAllOrders().subscribe((data)=>{
      this.orderList =  data.map(s=>{
            return{
              id: s.payload.doc.id,
              ... s.payload.doc.data()
            }
          })
    })
  }

}
