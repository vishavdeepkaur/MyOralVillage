import { Component, OnInit } from '@angular/core';

import { AppState } from '../app.service';
import { HeaderModule } from '../common/header';
import { XLargeDirective } from './x-large';


@Component({
  selector: 'home',
  
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  constructor(
    public appState: AppState

  ) { }

  public ngOnInit() {
    console.log('hello `Home` component');
  }
}
