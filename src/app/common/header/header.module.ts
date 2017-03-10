import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap'


@NgModule({
  imports: [RouterModule, CommonModule,NgbModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
