import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/Models/product';
import { ProductService } from 'app/Services/product.service';
import { Brand } from '../../../Models/brand';
import { BrandService } from '../../../Services/brand.service';
import { CRUDService } from '../../../Services/crud.service';

@Component({
  selector: 'app-brand-detailes',
  templateUrl: './brand-detailes.component.html',
  styleUrls: ['./brand-detailes.component.scss']
})
export class BrandDetailesComponent implements OnInit, OnDestroy {

  targetBrandID:string | null='';
  targitBrand:Brand = {} as Brand;
  brandProducts:Product[]=[];

  @ViewChild('pre') btn !:ElementRef;
  sliderInterval:any ='';

  constructor(  private routerActive: ActivatedRoute
              , private brandService: BrandService
              , private router: Router 
              , private productsService: ProductService) { }

  ngOnInit(): void {
    this.routerActive.paramMap.subscribe((param)=>{
      this.targetBrandID = param.get('id')? param.get('id'): '';

      this.targetBrandID?
      this.brandService.getBrandByID(this.targetBrandID).subscribe((brand)=>{
          this.targitBrand = brand;
          this.productsService.getBrandProducts(brand.name).subscribe((res)=>{
            console.log(res);
            this.brandProducts = res.map((pro)=>({
              ...pro.payload.doc.data(),
              id: pro.payload.doc.id
            }))
            console.log(this.brandProducts);
            
            
          })
      })
      :'';
    })

    this.fireSlider();
  }

  fireSlider()
  {
    this.sliderInterval = setInterval(()=>{
      this.btn.nativeElement.click()
    },3000)
  }

  goToEditBrand(id:string | null)
  {
    this.router.navigate([`SaveBrand/${id}`])
  }

  deleteBrand(id:string|null)
  {
    let sure = confirm(`Are you sure you want to delete '${this.targitBrand.name}' Brand?`);
    if(sure)
    {
      this.brandService.deleteBrand(id as string, this.targitBrand).then(()=>{
          alert('Brand has deleted successfully!');
          this.router.navigate(['Brands']);
      })
    }
  }
  goToProduct(id:string|undefined)
  {
    this.router.navigate([`Product/${id}`]);
  }

  ngOnDestroy(): void {
    clearInterval(this.sliderInterval);
  }
}