import {  Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private authAdmin: AdminService,
              private router:Router) { }

  @Output() openAndClose: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  toggleSideBar(){
      this.openAndClose.emit()
  }
  logOut(){
      this.authAdmin.logOut()
      this.router.navigate(['/Login'])
  }
  // diasjfiosdhfo

}
