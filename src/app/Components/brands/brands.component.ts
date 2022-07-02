import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Brand } from 'src/app/Models/brand';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, OnDestroy {

  Brands: any[] = [];
  subscriptions: Subscription[] = [];

  constructor(  private bransService: BrandService
              , private router:Router) {}

  ngOnInit(): void {
   let subscribe =  this.bransService.getAllBrands().subscribe((data)=>{
      this.Brands =  data.map(s=>{
            return{
              id: s.payload.doc.id, 
              value: s.payload.doc.data()
            }
          })
    })
    this.subscriptions.push(subscribe);
  }

  showDetailes(Bid:string)
  {
    this.router.navigate([`Brand/${Bid}`])
  }


  ngOnDestroy()
  {
    this.subscriptions.forEach((subscribe)=>{
        subscribe.unsubscribe();
    })
  }

}