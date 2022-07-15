import { Injectable } from '@angular/core';
import { CRUDService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor( private crude :CRUDService) {}
  
  getAllUsers()
  {
    return this.crude.getAll('USER')
  }

}
