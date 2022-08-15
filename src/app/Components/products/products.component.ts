import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ProductService} from '../../Services/product.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'app/Models/product';
import { CategoriesService } from 'app/Services/category.service';
import { Category } from 'app/Models/category';
import { SubCategory } from 'app/Models/sub-category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  
  catID:Array<{id:string}>=[{id:'All'}];
  list :Product[]=[];
  catList:SubCategory[]=[];
  subscriptions: Subscription[] = [];

  constructor(  private ProductService:ProductService
              , private categoryService:CategoriesService
              , private routerActive:ActivatedRoute
              , private route:Router
              ) { }

  ngOnInit(): void {
    // this.ProductService.addTest().then((res)=>{
    //   console.log(res);
    //   console.log("donneeee");
    // })
    // this.ProductService.addSubTest().then((res)=>{
    //   console.log(res);
    //   console.log('doonneee');
      
    // })

    this.routerActive.paramMap.subscribe((param)=>{
      if(param.get('state'))
      {
        this.catID = JSON.parse(param.get('state') as string).map((cat: any)=>({id:cat.EN}));
      }
    })

   this.catChanged()
   let catgs = this.categoryService.getAllCat().snapshotChanges().subscribe((categories: any[])=>{
    this.catList=[{id:'All'}];
      categories.map(cat=>{
       cat.payload.doc.data().subcollections.forEach((ele:any) => {
          this.catList.push({
            id: ele.EN
          })
       });
       console.log(this.catList);
       
      })
   })

   this.subscriptions.push(catgs);
}

AddNewPrd(){
  this.route.navigate(['SaveProduct']);
}

showDetailes(productID:string|undefined){
  this.route.navigate([`Product/${productID}`])
}

catChanged()
{  
  let products;
  if(this.catID.length==0 || this.catID.map((cat)=>cat.id).includes('All'))
  {
    products= this.ProductService.getAllProducts().subscribe((prodlist: any[])=> {
      this.list =  prodlist.map(s=>({
          id: s.payload.doc.id,
          ...s.payload.doc.data()
        }))
     })
  }
  else
  {
    products= this.ProductService.getProductsByCatsIds(this.catID.map((cat)=>cat.id))
    .subscribe((res)=>{
      this.list = res.map(pro=>({
          id: pro.payload.doc.id,
          ...pro.payload.doc.data()
        }))
    })
  }
  this.subscriptions.push(products);
}

ngOnDestroy()
{
  this.subscriptions.forEach((subscribe)=>{
      subscribe.unsubscribe();
  })
}
}
