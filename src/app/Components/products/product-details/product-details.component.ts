import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/Models/product';
import { ProductService } from 'src/app/Services/product.service';
import { CRUDService } from 'src/app/Services/crud.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  targetProductID:string | null='';
  targetProduct:Product = {} as Product;
;

  constructor(private activatedRoute:ActivatedRoute, 
   private productService:ProductService,
    private route: Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.targetProductID = param.get('id')? param.get('id'): '';

      this.targetProductID?
      this.productService.getByID(this.targetProductID).subscribe((product)=>{
            this.targetProduct = product;
        })
        :'';
   
    })

  }
  goToEditProduct(id:string | null)
  {
    this.route.navigate([`SaveProduct/${id}`])
  }

  goToDeleteProduct(id:string | null)
  {
    if(confirm('Are you sure to delete this product')){
    this.productService.deletePrd(id as string).then(()=>{
      this.route.navigate(['Products']);
  })
    }
  }

 

}
