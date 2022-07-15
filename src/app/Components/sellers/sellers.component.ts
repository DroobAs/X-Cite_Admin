import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SearchPipe} from '../../pipes/search.pipe';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Router } from '@angular/router';
import { Seller } from 'app/Models/seller';
import { SellerService } from 'app/Services/seller.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss'],
})
export class SellersComponent implements OnInit {
  // props
  usrFormGroup: FormGroup;
  user: string = '';
  sellersList: Seller[] | any;
  // subscriptions: Subscription[] = [];
  searchText: string = '';
  //constructor
  constructor(
    private seller: SellerService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.usrFormGroup = this.fb.group({
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
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/gm)],
      ],
      address: ['', [Validators.required, Validators.minLength(4)]],
      productName: ['', [Validators.required, Validators.minLength(3)]],
      age: [
        '',
        [
          Validators.required,
          Validators.maxLength(2),
          Validators.pattern(/^[0-9]{2}$/),
        ],
      ],
    });
  }

  get allInput() {
    return {
      fullName: this.usrFormGroup.get('fullName'),
      email: this.usrFormGroup.get('email'),
      mobileNo: this.usrFormGroup.get('mobileNo'),
      address: this.usrFormGroup.get('address'),
      productName: this.usrFormGroup.get('productName'),
      age: this.usrFormGroup.get('age'),
    };
  }

  ngOnInit(): void {
    this.seller.getAllSellers().subscribe((data) => {
      this.sellersList = data.map((s) => {
        return {
          id: s.payload.doc.id,
          ...s.payload.doc.data(),
        };
      });
    });
    // this.subscriptions.push(subscribe);
  }

  ngAfterViewInit() {}

  // methods

  // get All Sellers

  // add new seller
  addSeller(value: Seller) {
    // console.log(value);
    this.seller
      .addNewSeller(value)
      .then((res) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  // delete seller
  deleteSeller(id: string) {
    let donfDel = confirm('Are You Sure.. ?');
    if (donfDel) {
      this.seller
        .deleteSeller(id)
        .then((res: any) => {
          console.log(res);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  }
  // navgite to anthoer component and update
  sendId(id: string) {
    this.router.navigate([`Sellers/${id}`]);
  }
}
