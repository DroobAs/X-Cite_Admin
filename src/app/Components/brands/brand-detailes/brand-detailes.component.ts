import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand';
import { BrandService } from 'src/app/Services/brand.service';
import { CRUDService } from 'src/app/Services/crud.service';

@Component({
  selector: 'app-brand-detailes',
  templateUrl: './brand-detailes.component.html',
  styleUrls: ['./brand-detailes.component.scss']
})
export class BrandDetailesComponent implements OnInit, OnDestroy {

  targetBrandID:string | null='';
  targitBrand:Brand = {} as Brand;

  @ViewChild('pre') btn !:ElementRef;
  sliderInterval:any ='';

  constructor(  private routerActive: ActivatedRoute
              , private brandService: BrandService
              , private router: Router ) { }

  ngOnInit(): void {
    this.routerActive.paramMap.subscribe((param)=>{
      this.targetBrandID = param.get('id')? param.get('id'): '';

      this.targetBrandID?
      this.brandService.getBrandByID(this.targetBrandID).subscribe((brand)=>{
          this.targitBrand = brand;
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

  ngOnDestroy(): void {
    clearInterval(this.sliderInterval);
  }


}