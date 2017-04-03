import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.service'

@Component({
  
  selector: 'header',
  templateUrl: 'header.component.html',
  styleUrls: [ 'header.component.css' ]
})
export class HeaderComponent implements OnInit {
   userInfo;

  constructor(
    public appState :AppState
  ) {}
  
  ngOnInit(){
    this.userInfo = this.appState.get("user");    
  }
}
