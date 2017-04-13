import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';


import { TypeaheadComponent } from './typeahead';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
    imports: [
        CommonModule,
        NgbModule
    ],
    declarations: [
        TypeaheadComponent
    ],
    exports: [TypeaheadComponent],
    providers: []
})
export class SharedModule { }
