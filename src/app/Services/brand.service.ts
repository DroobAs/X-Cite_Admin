import { Injectable } from '@angular/core';
import { DocumentChangeAction, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Brand } from '../Models/brand';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private crudService: CRUDService) {}

  getAllBrands():Observable<DocumentChangeAction<Brand>[]>
  {
    return this.crudService.getAll('Brand');
  }

  getBrandByID(Bid:string) :Observable<Brand>
  {
    return this.crudService.getByID('Brand', Bid);
  }

  addNewBrand(brand:Brand): Promise<boolean>
    {
        return new Promise((resolve)=>{
        this.uploadOfferImg(brand).then(()=>{
          this.crudService.uploadImg(brand['Logo'] as File,'Brands/').then((url)=>{   
              brand['Logo'] = url;
              this.crudService.addNewDoc('Brand', brand).then(()=>{
                console.log('added successfully');
                  resolve(true);
              }).catch((err)=>{console.log(err);
              })
            })
          })
        })
  }

  updateBrand(brand:Brand, id:string, originBrand:Brand) :Promise<void>
  {
    return new Promise((resolve)=>{
      this.updateOffers(brand, originBrand).then(()=>{
        this.updateLogo(brand, originBrand).then(()=>{
          this.crudService.updateDoc('Brand', id, brand).then(()=>{
            resolve();
          })
          })
      }).catch((err)=>{console.log(err)})
    })
  }

  deleteBrand(Bid:string, brand:Brand): Promise<void>
  {
    return new Promise((resolve)=>{
      this.crudService.deleteImg(brand.Logo as string).subscribe(()=>{
        brand.offers.forEach((offer, index)=>{
          this.crudService.deleteImg(offer.imgOffer).subscribe(()=>{
            if(index == brand.offers.length-1)
            {
              this.crudService.deleteDoc('Brand',Bid).then(()=>{
                  resolve();
              })
            }
          })
        })
        this.crudService.deleteDoc('Brand',Bid).then(()=>{
          resolve();
        })
      })
    })
  }

  updateLogo(brand:Brand, origin:Brand): Promise<void>
  {
    return new Promise((resolve)=>{
      if (typeof(brand.Logo) == 'string')
      {
        resolve();
      }
      else
      {
        this.crudService.updateImg(brand.Logo, origin.Logo as string).then((url)=>{
              brand.Logo = url;
              resolve();
        })
      }
    })
  }

  async uploadOfferImg( brand:Brand) : Promise<void>
  {
      let i = 0;
      while (i < brand.offers.length)
      {
        await this.crudService.uploadImg(brand.offers[i].imgOffer[0], 'Offers/').then((url)=>{
          brand.offers[i].imgOffer = url;  
          i++;
        }).catch((err)=>{console.log(err);})
      }
      if(i== brand.offers.length)
      {
        return new Promise((resolve)=>{
          resolve();
        })
      }
  }

  async updateOffers(brand:Brand, origin:Brand): Promise<void>
  {
    let i = 0;
    while (i < brand.offers.length)
    {      
      console.log('in big while', i);
      while (i<origin.offers.length)
      {
        console.log('in first while', i);
        if(typeof(brand.offers[i].imgOffer) == 'string')
        {
          i++;
        }
        else
        {
          console.log(brand.offers[i].imgOffer);
          console.log( origin.offers[i].imgOffer);
          await this.crudService.updateImg(brand.offers[i].imgOffer, origin.offers[i].imgOffer).then((res)=>{
                brand.offers[i].imgOffer = res;
                i++;
          }).catch((err)=>{console.log(err);})
        }
      }
      while(i>=origin.offers.length && (i<brand.offers.length))
      {
      console.log('in second while', i);
          await this.crudService.uploadImg(brand.offers[i].imgOffer,'Offers/').then((url)=>{
              brand.offers[i].imgOffer = url;
              i++;
          }).catch((err)=>{console.log(err);})
      }
    }
    if(i== brand.offers.length)
    {
      console.log('in return', brand.offers.length);
      
      return new Promise((resolve)=>{
        resolve();
      })
    }
  }
}