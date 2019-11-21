import { DialogService } from './../../../shared/dialog.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormulationRoutingModule } from './formulation-routing.module';
import { DetailComponent } from './detail/detail.component';
import { FormulationComponent } from './formulation.component';

@NgModule({
  declarations: [FormulationComponent, DetailComponent],
  imports: [
    CommonModule,
    FormulationRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [DetailComponent],
  providers: [DialogService]
})
export class FormulationModule { }
