import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { ViewCategoriesComponent } from './view-categories';
import { ViewContentComponent } from './view-content';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'


@NgModule({
    imports: [RouterModule, CommonModule, NgbModule],
    declarations: [GalleryComponent, ViewCategoriesComponent, ViewContentComponent],
    exports: []
})
export class GalleryModule { }
