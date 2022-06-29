import {  Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  @Output() openAndClose: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
  }
  toggleSideBar(){
      this.openAndClose.emit()
  }

}
