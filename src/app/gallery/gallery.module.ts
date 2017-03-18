import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { ViewCategoriesComponent } from './view-categories';
import { ViewContentComponent } from './view-content';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { routes } from './gallery.routes.config'
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
        ViewContentComponent
    ],
    exports: [],
    providers:[ContentService]
})
export class GalleryModule { }
