import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'admin-panel',
  styleUrls: ['./admin-panel.component.css'],
  templateUrl: `./admin-panel.component.html`

})
export class AdminPanelComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('admin panel component');
  }
}

