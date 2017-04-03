import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { routes } from './admin-panel.routes'

//Custom components
import { AdminPanelComponent } from './admin-panel.component';
import { SignupComponent } from './signup/signup.component';
import { HomeListComponent } from './home-list/home-list.component';


//Custom Services
import { ContentService } from '../../services'


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        AdminPanelComponent,
        HomeListComponent,
        SignupComponent
    ],
    exports: [],
    providers: [ContentService]
})
export class AdminPanelModule { }
