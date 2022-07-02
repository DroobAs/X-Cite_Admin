import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-update-brand',
  templateUrl: './add-update-brand.component.html',
  styleUrls: ['./add-update-brand.component.scss']
})
export class AddUpdateBrandComponent implements OnInit {
  Add:boolean = false;
  updatedID: string | null = null;
  saveBrandForm!:FormGroup;

  constructor( private routerActive: ActivatedRoute
             , private FormBuilder : FormBuilder) {

              this.saveBrandForm = FormBuilder.group({
                  ID: ['',[]],
                  BrandName: ['',[]],
                  BrandLogo: ['',[]],
                  BrandCategories: FormBuilder.array([['',[]]]),
                  BrandOffers: FormBuilder.array([
                    FormBuilder.group({
                      offerImg:['',[]],
                      offerInfo:['',[]]
                    })
                  ])
              })
            }

  ngOnInit(): void {
    this.routerActive.paramMap.subscribe((params)=>{
      params.get('id')?this.Add = false: this.Add = true;
      params.get('id')?this.updatedID = params.get('id'): this.updatedID = null;    
    })
  }

  get brandIDPro()
  {
    return this.saveBrandForm.get('ID');
  }
  get brandNamePro()
  {
    return this.saveBrandForm.get('BrandName');
  }
  get BrandLogoPro()
  {
    return this.saveBrandForm.get('BrandLogo');
  }
  get BrandCategoriesPro()
  {
    return this.saveBrandForm.get('BrandCategories') as FormArray
  }
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

  addNewCategory()
  {

  }
  removeCategory(i:number)
  {

  }
  addNewoffer()
  {

  }
  removeOffer(i:number)
  {

  }
  submitSaveBrand()
  {
    
  }


}