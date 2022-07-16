import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import {FormArray,  FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from 'app/Models/product';
import { ProductService } from 'app/Services/product.service';





@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss']
})
export class AddUpdateProductComponent implements OnInit {
  Add:boolean = false;
  updatedID: string | null = null;
  saveProductForm!:FormGroup;
  updatedProduct: Product = {} as Product;


  constructor(  @Inject(ActivatedRoute) private activatedRoute:ActivatedRoute 
              , @Inject(Router) private route:Router
              , @Inject(FormBuilder) private formBuilder : FormBuilder 
              , private productService: ProductService) {
    this.saveProductForm = formBuilder.group({
      ProductName: ['',[Validators.required, Validators.pattern('[a-z A-Z]{3,}')]],
      ProductQuantity: ['',[]],
      ProductPrice:['',[]],
      ProductOverView:['',[]],
  })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params)=>{
      params.get('id')?this.Add = false: this.Add = true;
      params.get('id')?this.updatedID = params.get('id'): this.updatedID = null;

      if(params.get('id'))
      {
        this.Add = false;
        this.updatedID = params.get('id');
        this.productService.getByID(this.updatedID as string).subscribe((product: Product)=>{
          this.updatedProduct=product;

          this.saveProductForm.patchValue({
            ProductName: product.name,
            ProductQuantity: product.quantity,
            ProductPrice: product.price,
            ProductOverView:product.overview,
          });
        })

      }
      else
      {
        this.Add = true;
        this.updatedID = null;
      }

    })
  }

  get ProductName()
  {
    return this.saveProductForm.get('ProductName');
  }
  get ProductQuantity()
  {
    return this.saveProductForm.get('ProductQuantity');
  }
  get ProductPrice()
  {
    return this.saveProductForm.get('ProductPrice');
  }

  get ProductOverView()
  {
    return this.saveProductForm.get('ProductOverView');
  }


  SaveProduct()
  {
    let NewPrd: Product = {
      name: this.ProductName?.value,
      price:this.ProductPrice?.value,
      quantity:this.ProductQuantity?.value,
      overview:this.ProductOverView?.value,

    }
    let updatedProduct: Product = {
      name: this.ProductName?.value,
      price:this.ProductPrice?.value,
      quantity:this.ProductQuantity?.value,
      overview:this.ProductOverView?.value,

    }
    if (this.Add)
    {
    this.productService.addNewPrd(NewPrd).then(()=>{
      this.Saved()

    })
  }
  else
    {
      this.productService.updatePrd(this.updatedID as string,updatedProduct)
      this.Saved();
    }
  }
  Saved()
  {

    this.saveProductForm.reset();
    setTimeout(() => {
        this.route.navigate(['/Products']);
    }, 2000);
  }

}
