import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect'
import { SharedModule } from '../shared'
import { routes } from './gallery.routes.config'

//Custom components
import { GalleryComponent } from './gallery.component';
import { ViewCategoriesComponent } from './view-categories';
import { ViewContentComponent } from './view-content';


import { AddContentModal, EditContentModal } from './view-content/modals';
import { ContentItemTile } from './view-content/content-item-tile';
import { ContentDetailsSidebar } from './view-content/content-details-sidebar';


//Custom Services
//import { ContentService } from '../../services'


@NgModule({
    entryComponents: [AddContentModal, EditContentModal],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        MultiselectDropdownModule,
        SharedModule,
        FormsModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        GalleryComponent,
        ViewCategoriesComponent,
        ViewContentComponent,
        AddContentModal,
        EditContentModal,
        ContentItemTile,
        ContentDetailsSidebar

    ],
    exports: [],
    providers: []
})
export class GalleryModule { }
