import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { routes } from './gallery.routes.config'

//Custom components
import { GalleryComponent } from './gallery.component';
import { ViewCategoriesComponent } from './view-categories';
import { ViewContentComponent } from './view-content';
import { ContentItemTile } from './view-content/content-item-tile';
import { ContentDetailsSidebar } from './view-content/content-details-sidebar';

//Custom Services
import { ContentService } from '../services/content-service.service'


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        GalleryComponent, 
        ViewCategoriesComponent, 
        ViewContentComponent,
        ContentItemTile,
        ContentDetailsSidebar
    ],
    exports: [],
    providers:[ContentService]
})
export class GalleryModule { }
