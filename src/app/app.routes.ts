import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { GalleryComponent } from './gallery';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  {
        path: 'wrap',
        component: GalleryComponent,
        children: [
          {
            path: 'days',
            component: View,
            outlet: 'main'
          }
        ]
    },
  { path: '**', component: NoContentComponent },
];
