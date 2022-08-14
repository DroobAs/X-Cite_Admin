import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/Models/product';
import { ProductService } from 'app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  targetProductID:string | null='';
  targetProduct:Product = {} as Product;
;

  constructor(  @Inject(ActivatedRoute) private activatedRoute:ActivatedRoute,
                private productService:ProductService,
                @Inject(Router) private route: Router) { }

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
    if(confirm('Are you sure to delete this product?'))
    {
      this.productService.deletePrd(id as string, this.targetProduct).then(()=>{
        alert('Product has deleted successfully!');
        this.route.navigate(['Products']);
        })
    }
  }

}