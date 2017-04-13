import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { routes } from './data-visuals.routes.config'

//Custom components
import { ChloropethComponent } from './chloropeth';
import { ScatterPlotComponent } from './scatter-plot';
import { VisualContainerComponent } from './visual-container';

//Custom Services
import { DataVisualsService } from '../../services'


@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        VisualContainerComponent,
        ChloropethComponent,
        ScatterPlotComponent
    ],
    exports: [],
    providers: [DataVisualsService]
})
export class DataVisualsModule { }
