import { Routes } from '@angular/router'

import { ViewContentComponent } from './view-content'
import { ViewCategoriesComponent } from './view-categories'
import { GalleryComponent } from '.'

export const routes: Routes = [
    {
        path: 'gallery', component: GalleryComponent, children: [         
            { path: '', component: ViewCategoriesComponent },
            { path: 'view-content/:category', component: ViewContentComponent },
        ]
    }
];
