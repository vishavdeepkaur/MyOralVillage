import { Component, Input, Output, OnInit } from '@angular/core';
import { AppState } from '../../../app.service';
import { ContentService } from '../../../services';


@Component({
    selector: 'items-editor',
    styleUrls: ['./items-editor.component.css'],
    templateUrl: `./items-editor.component.html`

})
export class ItemsEditorComponent implements OnInit {
    @Input() title;
    @Input() collectionName: String;
    @Input() collectionItems;

    constructor(
        public appState: AppState,
        public contentService: ContentService
    ) { }

    public ngOnInit() {
        console.log(this.appState.state)
    }


}

