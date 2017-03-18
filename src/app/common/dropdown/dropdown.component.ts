import {Component, Input} from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html'
})
export class Dropdown {
  @Input() selectedItem;
  
}