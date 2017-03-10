import { Component, OnInit,Input,Output } from '@angular/core';
import { AppState } from '../../app.service';

/*
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'view-content',
  styleUrls: ['./view-content.component.css'
  ],
  templateUrl: `./gallery.component.html`

})
export class ViewContentComponent implements OnInit {
    @Input() type;



  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('gallery component');
  }
}

