import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'home-list',
  styleUrls: ['./home-list.component.css'],
  templateUrl: `./home-list.component.html`

})
export class HomeListComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('gallery component');
  }
}

