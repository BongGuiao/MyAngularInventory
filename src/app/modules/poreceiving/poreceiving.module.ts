import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from './../../shared/dialog.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PoreceivingComponent } from './poreceiving.component';
import { PoreceivingRoutingModule } from './poreceiving-routing.module';
import { PoreceivingdetailComponent } from './poreceivingdetail/poreceivingdetail.component';

@NgModule({
  declarations: [PoreceivingComponent, PoreceivingdetailComponent, ],
  imports: [
    CommonModule,
    PoreceivingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [PoreceivingdetailComponent, ],
  providers: [DialogService]
})
export class PoreceivingModule { }
