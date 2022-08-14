import { Injectable } from '@angular/core';

import { CRUDService } from './crud.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private crud:CRUDService) {}
  getAllUsers(){
      return this.crud.getAll("users")
  }

}
