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

  addNewBrand(brand:Brand):Promise<DocumentReference<Brand>>
  {
    return this.crudService.addNewDoc('Brand', brand);
  }

  updateBrand(Bid:string, newData: Brand): Promise<void>
  {
      return this.crudService.updateDoc('Brand', Bid, newData);
  }

  deleteBrand(Bid:string): Promise<void>
  {
    return this.crudService.deleteDoc('Brand',Bid);
  }
}