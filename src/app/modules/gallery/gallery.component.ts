import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.service';


@Component({
  selector: 'gallery',
  styleUrls: ['./gallery.component.css'],
  templateUrl: `./gallery.component.html`

})
export class GalleryComponent implements OnInit {
  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    console.log('gallery component');
  }
}

