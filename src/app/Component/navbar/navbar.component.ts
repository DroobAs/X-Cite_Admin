import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  @Output() openAndClose: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  toggleSideBar(){
      this.openAndClose.emit()
  }

}
