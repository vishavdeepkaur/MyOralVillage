import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: `./login.component.html`

})
export class LoginComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('login component');
  }
}

