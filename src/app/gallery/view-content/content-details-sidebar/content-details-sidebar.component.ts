import { Component, OnInit, Input, animate, trigger, transition, state, style } from '@angular/core';
import { AppState } from '../../../app.service';
import { ContentService, Selection, Category, ContentItemServer, ContentItemBase, Theme, Country } from '../../../services';


@Component({
    selector: 'content-details-sidebar',
    styleUrls: ['./content-details-sidebar.component.css'],
    templateUrl: `./content-details-sidebar.component.html`,
    animations: [
        trigger('slideInOut', [
            state("hidden", style({
                width:'0px'
            })),
            state('visible', style({
                width:'200px'
            })),
            transition('hidden => visible', animate('300ms ease-in-out')),
            transition('visible => hidden', animate('300ms ease-in-out'))
        ]),
    ]
})
export class ContentDetailsSidebar implements OnInit {
    @Input() visible: boolean
    @Input() selectedItem: ContentItemServer;


    constructor(
        public appState: AppState
    ) { }

    public ngOnInit() {
    }


}

