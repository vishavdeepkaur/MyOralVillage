import { Routes } from '@angular/router'

import { AdminPanelComponent } from './admin-panel.component'
import { HomeListComponent } from './home-list/home-list.component'
import { SignupComponent } from './signup/signup.component'
import { AuthGuard } from '../../guards'

export const routes: Routes = [
    { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
    { path: 'admin/signup', component: SignupComponent },
    { path: 'admin/edit-home', component: HomeListComponent }
];
