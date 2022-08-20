import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/Models/product';
import { CategoriesService } from 'app/Services/category.service';
import { ProductService } from 'app/Services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  targetProductID:string | null='';
  targetProduct:Product = {} as Product;
  attributes:(keyof typeof this.targetProduct)[]=[]
  
  
  constructor(  private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private route: Router,
    private catService:CategoriesService) { 
    }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.targetProductID = param.get('id')? param.get('id'): '';

      this.targetProductID?
      this.productService.getByID(this.targetProductID).subscribe((product)=>{
            this.targetProduct = product;
            this.catService.getSubCategory(product.categoryName).subscribe((res)=>{
               this.attributes = res.find((ele)=>ele.payload.doc.id=='attributes')?.payload.doc.data().attributes;
            })
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