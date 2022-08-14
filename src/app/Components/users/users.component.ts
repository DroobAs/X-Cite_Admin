import { Component, OnInit } from '@angular/core';
import { Seller } from 'app/Models/seller';
import { UserService } from 'app/Services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  searchText: string = '';
  usersList: Seller[] | any;
  orderList: [] | any;
  constructor(private users: UserService) {}

  ngOnInit(): void {
    this.users.getAllUsers().subscribe((data) => {
      this.usersList = data.map((s) => {
        return {
          id: s.payload.doc.id,
          ...s.payload.doc.data(),
        };
      });
    });
  }
}
