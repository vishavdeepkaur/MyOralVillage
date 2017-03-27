import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentItemBase } from '../../../../services/content-service.model'
import { AppState } from '../../../../app.service'

@Component({
    selector: 'edit-content-modal',
    templateUrl: './edit-content-modal.component.html',
    styleUrls: ['./edit-content-modal.component.css']
})
export class EditContentModal {
    @Input() countries;
    @Input() themes;
    @Input() categories;
    @Input() tags;

    @Input() contentItem : ContentItemBase;

    @Output() onContentItemUpdate: EventEmitter<any> = new EventEmitter();
    constructor(public activeModal: NgbActiveModal, private appState: AppState) { }


    updateContentItem(event) {
        let data = {
            name: event.target.name.value,
            description: event.target.description.value,           
            theme: event.target.theme.value,
            category: event.target.category.value,
            country: event.target.country.value,
            tag: event.target.tag.value
        }

        this.onContentItemUpdate.emit({ contentItemData: data });
    }
}