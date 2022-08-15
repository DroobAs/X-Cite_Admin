import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'app/Services/product.service';
import { Order } from '../../Models/order'
import { OrdersService } from '../../Services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderList: Order[]=[];
  states:any[]=[];
  constructor(  private orderService:OrdersService
              , private productService: ProductService
              , private router: Router) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data)=>{
      let Ids:string[] = [];
      data.forEach(s=>{        
        Ids.push(...s.payload.doc.data().purchase_units.map((un)=>un.id))
      })
      this.productService.getSpecificProductsWithIds(Ids).subscribe((res)=>{
        let prods =  res.map(pro=>({
                  ...pro.payload.doc.data(),
                  id: pro.payload.doc.id,
        }))    

        this.orderList = data.map((ele)=>{
            return ({
                ...ele.payload.doc.data(),
                fsId: ele.payload.doc.id,
                purchase_units: ele.payload.doc.data().purchase_units.map((unit)=>({
                                  ...unit,
                                  product: prods.find((ele)=>ele.id==unit.id)
                                }))
            })
          })
          this.states = this.orderList.map((order)=>({
            id:order.fsId,
            state: order.state,
            upToDate:true
          }))
          })
    })
  }

  goToProduct(id:string)
  {
    this.router.navigate([`Product/${id}`])
  }

  updateOrderState(target:{id:string, state:string, upToDate:boolean})
  {
    if(target.state)
    {
      let orderSubscripe = this.orderService.getOrderById(target.id).subscribe((res)=>{
        console.log('in subscripe');
        let updatedOrder= {
          ...res,
          state: target.state
        }      
        orderSubscripe.unsubscribe();
        this.orderService.updateOrderState(target.id, updatedOrder)
          .then(()=>{
              target.upToDate= true;
              console.log(this.states);
              
          })
      })
    }
    else
    {
      console.log('empty state');
      
    }
  }

  changeOrderUpToDate(target:{id:string, state:string, upToDate:boolean})
  {
    target.upToDate= false;
  }
}