import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
    @Input() collectionItems: any[];

    @Output() onRemove = new EventEmitter();

    constructor(
        public appState: AppState,
        public contentService: ContentService
    ) { }

    public ngOnInit() {
        console.log(this.appState.state)


    }

    promptEdit($event, index, collectionName) {
        let colName = collectionName.toLowerCase();
        this.onRemove.emit({ index, colName })
    }

    promptDelete($event, index, collectionName) {
        console.log("clicked item", $event, index, collectionName)

        let colName = collectionName.toLowerCase();
        this.onRemove.emit({ index, colName })
    }


    // public onItemRemoved($event) {
    //     let identifier = $event.srcElement.getAttribute("name");

    //     // let filtered = this.collectionItems.filter(
    //     //     (item, i) => {
    //     //         if (item.name)
    //     //             return item.name !== identifier;
    //     //         return item !== identifier;
    //     //     })


    // }



}

