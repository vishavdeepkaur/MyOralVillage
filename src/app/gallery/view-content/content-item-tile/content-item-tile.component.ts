import { Component, OnInit ,Input, Output ,EventEmitter} from '@angular/core';
import { AppState } from '../../../app.service';
import { ContentService, Selection, Category, ContentItemServer, ContentItemBase, Theme, Country } from '../../../services';


@Component({
  selector: '[content-item-tile]',
  styleUrls: ['./content-item-tile.component.css'],
  templateUrl: `./content-item-tile.component.html`

})
export class ContentItemTile implements OnInit {
 @Input() data : ContentItemServer;
 @Input() selection : ContentItemServer;
 @Output() setSelected =  new EventEmitter();

  constructor(
    public appState: AppState
  ) { }

  public ngOnInit() {
    
  }

  public setSelectedItem(event){
    this.setSelected.emit(this.data)
  }

}

