import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect'
import { routes } from './data-visuals.routes.config'

//Custom components
import { ChloropethComponent } from './chloropeth';
import { ScatterPlotComponent } from './scatter-plot';
import { BarGraphComponent } from './bar-graph';
import { VisualContainerComponent } from './visual-container';

//Custom Services
import { DataVisualsService } from '../../services'


@NgModule({
    imports: [
        RouterModule,
        FormsModule,
        CommonModule,
        NgbModule,
        MultiselectDropdownModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        VisualContainerComponent,
        ChloropethComponent,
        ScatterPlotComponent,
        BarGraphComponent
    ],
    exports: [],
    providers: [DataVisualsService]
})
export class DataVisualsModule { }
