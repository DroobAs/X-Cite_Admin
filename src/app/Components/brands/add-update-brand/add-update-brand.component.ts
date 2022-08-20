import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Brand } from 'app/Models/brand';
import { BrandService } from 'app/Services/brand.service';
import { Offer } from 'app/Models/offer';
import { inject } from '@angular/core';

@Component({
  selector: 'app-add-update-brand',
  templateUrl: './add-update-brand.component.html',
  styleUrls: ['./add-update-brand.component.scss']
})
export class AddUpdateBrandComponent implements OnInit {
  Add:boolean = false;
  updatedID: string | null = null;
  updatedBrand: Brand = {} as Brand;
  saveBrandForm!:FormGroup;
  isload:boolean = false;
  done:boolean = false;

  @ViewChild('img') img!: ElementRef;

  constructor( private routerActive: ActivatedRoute
             , private FormBuilder : FormBuilder
             , private brandService: BrandService
             , private router: Router) {

              this.saveBrandForm = FormBuilder.group({
                  BrandName: ['',[Validators.required, Validators.pattern('[a-z A-Z]{3,}')]],
                  BrandNameAR: ['',[Validators.required, Validators.pattern('[ء-ي ]{3,}')]],
                  BrandLogo: ['',[]],
                  // BrandCategories: FormBuilder.array([['',[Validators.required, Validators.pattern('[a-z A-Z0-9]{3,}')]]]),
                  // BrandCategories: FormBuilder.array([['',[]]]),
                  BrandOffers: FormBuilder.array([])
              })
            }

  ngOnInit(): void {
    this.routerActive.paramMap.subscribe((params)=>{
      if(params.get('id'))
      {
        console.log('inonit');
        
        this.Add = false;
        this.updatedID = params.get('id');
        this.brandService.getBrandByID(this.updatedID as string).subscribe((brand)=>{
          console.log('getted brand', brand);
          
            this.updatedBrand = brand;
            // brand
            for(let i=0; i<brand.offers.length; i++)
            {
              this.addNewoffer();
            }
            this.BrandOffersPro.controls.forEach((offer)=>{
              offer.get('offerImg')?.removeValidators([Validators.required]);
            })

            // Category
            // for(let i=0; i<brand.categories.length-1; i++)
            // {
            //   this.addNewCategory();
            // }

            this.saveBrandForm.patchValue({
              BrandName: brand.name,
              BrandNameAR: brand.nameAR,
              // BrandCategories: brand.categories,
              BrandOffers: brand.offers
            });
            console.log(this.Add,this.saveBrandForm);
            
        })
      }
      else
      {
        this.Add = true;
        this.updatedID = null;
        this.BrandLogoPro?.addValidators([Validators.required]);
      }
    })
  }

  get brandNamePro()
  {
    return this.saveBrandForm.get('BrandName');
  }
  get brandNameARPro()
  {
    return this.saveBrandForm.get('BrandNameAR');
  }
  get BrandLogoPro()
  {
    return this.saveBrandForm.get('BrandLogo');
  }
  // get BrandCategoriesPro()
  // {
  //   return this.saveBrandForm.get('BrandCategories') as FormArray;
  // }
  get BrandOffersPro()
  {
    return this.saveBrandForm.get('BrandOffers') as FormArray;
  }
  get offerImgPro()
  {
    return this.saveBrandForm.get('BrandOffers')?.get('offerImg');
  }
  get offerInfoPro()
  {
    return this.saveBrandForm.get('BrandOffers')?.get('offerInfo');
  }

  // addNewCategory()
  // {
  //   console.log('in add cat');
  //   this.BrandCategoriesPro.push(this.FormBuilder.control('',[Validators.required, Validators.pattern('[a-z A-Z0-9]{3,}')]));
  // }
  // removeCategory(i:number)
  // {
  //   this.BrandCategoriesPro.removeAt(i);
  // }
  addNewoffer()
  {
    this.BrandOffersPro.push(this.FormBuilder.group({
      offerImg:['',[Validators.required]],
      offerInfo:['',[Validators.required, Validators.minLength(10)]]
    }));
  }
  removeOffer(i:number)
  {
    this.BrandOffersPro.removeAt(i);
    if(!this.Add)
    {
      this.updatedBrand.offers.splice(i,1);
    }
  }

  SaveBrand()
  {
    this.isload = true;
    // let categories: string[]=[];
    // this.BrandCategoriesPro.controls.forEach((cat)=>{
    //   categories.push(cat.value);
    // })

    let offers: Offer[] = [];
    this.BrandOffersPro.controls.forEach((offer, index)=>{
      let ofile: File = ((document.getElementById('offerImg'+index) as HTMLInputElement)?.files as FileList)[0];
        let _offer = {
          imgOffer: this.Add?ofile:(ofile?ofile:this.updatedBrand.offers[index].imgOffer),
          offerInfo:  offer.get('offerInfo')?.value
        }
        offers.push(_offer);
    });

    let file: File = this.img.nativeElement.files[0];
    let brand: Brand = {
      name: this.brandNamePro?.value,
      nameAR: this.brandNameARPro?.value,
      logo: this.Add?file:(file?file:this.updatedBrand.logo),
      // categories: categories,
      offers: offers
    }

    if (this.Add) //Add
    {
      this.brandService.addNewBrand(brand).then(()=>{
        this.Saved()
      })
    }
    else //update
    {
      this.brandService.updateBrand(brand, this.updatedID as string, this.updatedBrand).then(()=>{
        this.Saved();
      })
    }
  }

  Saved()
  {
    this.isload = false;
    this.done = true;
    this.saveBrandForm.reset(); 
    setTimeout(() => {
      if(this.Add)
      {
        this.router.navigate(['/Brands']);
      }
      else
      {
        this.router.navigate([`/Brand/${this.updatedID}`]);
      }
    }, 3000);
  }
}