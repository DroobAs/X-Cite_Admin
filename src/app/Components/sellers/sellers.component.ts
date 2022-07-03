import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seller } from '../../Models/seller';
import { SellerService } from '../../Services/seller.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss'],
})
export class SellersComponent implements OnInit {
  usrFormGroup: FormGroup;
  user: string = '';
  sellersList: Seller[] | any;

  constructor(private seller: SellerService, private fb: FormBuilder) {
    this.usrFormGroup = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g
          ),
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
  get fullName() {
    return this.usrFormGroup.get('fullName');
  }
  ngOnInit(): void {
    //  this.seller.getAll().subscribe((res: any)=> console.log(res));
    this.seller.getAllSeller().subscribe((res)=> {
      this.sellersList = res
    });

  }
  ngAfterViewInit() {}

  
  addSeller(value: Seller) {
    // console.log(value);
    this.seller.addNewSeller(value).subscribe((res) => console.log(res));
    this.seller.getAllSeller().subscribe()
  }
}
