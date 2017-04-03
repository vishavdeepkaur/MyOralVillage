import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'signup',
  styleUrls: ['./signup.component.css'],
  templateUrl: `./signup.component.html`

})
export class SignupComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('signup component');
  }
}

