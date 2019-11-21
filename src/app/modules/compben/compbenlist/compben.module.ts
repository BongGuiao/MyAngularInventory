import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompbenRoutingModule } from './compben-routing.module';
import { CompbendetailComponent } from '../compbendetail/compbendetail.component';
import { CompbenTableService } from './../../../shared/compben.service';
import { CompbenlistComponent } from './../compbenlist/compbenlist.component';
@NgModule({
  declarations: [CompbenlistComponent, CompbendetailComponent],
  imports: [
    CommonModule,
    CompbenRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [CompbendetailComponent],
  providers: [CompbenTableService]
})
export class CompbenModule { }
