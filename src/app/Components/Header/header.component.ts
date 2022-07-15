import {  Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../Services/admin.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

<<<<<<< HEAD
  constructor(private authAdmin: AdminService,
              private router:Router) { }
=======
  constructor( private authAdmin: AdminService
             , @Inject(Router) private router: Router
               ) { }
               
>>>>>>> 0b314cf0102226bcd635a8ac119f3cd660fd5eb4
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

}
