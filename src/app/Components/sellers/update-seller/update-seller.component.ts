import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Seller } from 'app/Models/seller';
import { SellerService } from 'app/Services/seller.service';
// import { FormsModule }   from '@angular/forms';
// import { NgModule } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-seller',
  templateUrl: './update-seller.component.html',
  styleUrls: ['./update-seller.component.scss'],
})
export class UpdateSellerComponent implements OnInit {
  usrFormGroup: FormGroup;
  user: string = '';

  sellerId: string = '';
  id:string  = ''
  seller: Seller | undefined;
  dynamicVariable = false;
  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    private updateseller: SellerService,
    @Inject(Router) private router: Router,
    // private form:FormGroup

  ) {
    this.usrFormGroup = this.fb.group({
      usrID: [''],
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g),
        ],
      ],
      mobileNo: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(6)]],
      productName: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.maxLength(3)]],
    });

  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params : ParamMap)=>{params.get('id')})
    let id: any = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.updateseller.getSellerbyID(id).subscribe((oneSel) => {
      this.seller = oneSel;
    });
  }
  get fullName() {
    return this.usrFormGroup.get('fullName');
  }
  updateSeller(value: Seller) {
    let id: string | any = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.updateseller.updateSeller(id, value).then((res)=>  {
      this.router.navigate(['Sellers'])
    }).catch((err)=> {
      console.log(err);
    })

  }
}
