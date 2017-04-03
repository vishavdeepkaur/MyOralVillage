import { Routes } from '@angular/router'

import { ChloropethComponent } from './chloropeth';
import { VisualContainerComponent } from './visual-container';

export const routes: Routes = [
    {
        path: 'analysis', component: VisualContainerComponent
        // , children: [         
        //     { path: '', component: ViewCategoriesComponent },
        //     { path: 'view-content/:category', component: ViewContentComponent },
        // ]
    }
];
