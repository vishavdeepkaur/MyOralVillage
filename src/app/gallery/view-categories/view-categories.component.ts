import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'gallery',
  styleUrls: [
    './gallery.component.css'
  ],
  templateUrl: `./gallery.component.html`

})
export class ViewCategoriesComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('ViewCategoriesComponent');
  }
}

