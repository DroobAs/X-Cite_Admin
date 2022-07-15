import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brand } from '../../../app/Models/brand';
import { BrandService } from '../../Services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, OnDestroy {

  Brands: any[] = [];
  subscriptions: Subscription[] = [];

  constructor(  private bransService: BrandService
              , @Inject(Router) private router:Router) {}

  ngOnInit(): void {
   let subscribe =  this.bransService.getAllBrands().subscribe((data)=>{
      this.Brands =  data.map(s=>{
        console.log(data);
        
            return{
              id: s.payload.doc.id, 
              ...s.payload.doc.data()
            }            
          })
    })
    this.subscriptions.push(subscribe);
  }

  showDetailes(Bid:string)
  {
    this.router.navigate([`Brand/${Bid}`])
  }

  goToAddNew()
  {
    this.router.navigate(['SaveBrand']);
  }


  ngOnDestroy()
  {
    this.subscriptions.forEach((subscribe)=>{
        subscribe.unsubscribe();
    })
  }

}