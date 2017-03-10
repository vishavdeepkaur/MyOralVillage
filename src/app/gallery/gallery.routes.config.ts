import { Routes } from '@angular/router'

import { ViewContentComponent } from './view-content'
import { ViewCategoriesComponent} from './view-categories'
export const routes: Routes = [
    { path: 'view-content/:type/:subtype', component: ViewContentComponent },
    { path: 'view-categories', component: ViewCategoriesComponent }
];
