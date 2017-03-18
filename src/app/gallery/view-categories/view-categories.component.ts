import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'view-categories',
  styleUrls: [
    './view-categories.component.css'
  ],
  templateUrl: `./view-categories.component.html`

})
export class ViewCategoriesComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('ViewCategoriesComponent');
  }
}

