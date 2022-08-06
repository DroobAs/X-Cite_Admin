import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ProductService} from '../../Services/product.service'
import { Router } from '@angular/router';
import { Product } from 'app/Models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(  private ProductService:ProductService
              , @Inject(Router) private route:Router) { }
  list :Product[]=[]
  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    let products= this.ProductService.getAllProducts().subscribe((prodlist: any[])=> {
    this.list =  prodlist.map(s=>{
      return{
        id: s.payload.doc.id,
        ...s.payload.doc.data()
      }
    })
    console.log( this.list);
   })
   this.subscriptions.push(products);

  //  this.ProductService.updatePrd(PrdID, UpdatedPrd)


}

AddNewPrd(){
  this.route.navigate(['SaveProduct']);

}

showDetailes(productID:string|undefined){
  this.route.navigate([`Product/${productID}`])
}

ngOnDestroy()
{
  this.subscriptions.forEach((subscribe)=>{
      subscribe.unsubscribe();
  })
}
}
