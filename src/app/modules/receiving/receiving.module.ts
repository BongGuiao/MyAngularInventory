import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceivingRoutingModule } from './receiving-routing.module';
import { ReceivingComponent } from './receiving.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IngredientsComponent } from './../formulation/ingredients/ingredients.component';
import { ReceivingdetailComponent } from './receivingdetail/receivingdetail.component';
@NgModule({
  declarations: [ReceivingComponent,
                ReceivingdetailComponent,
                IngredientsComponent],
  imports: [
    CommonModule,
    ReceivingRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [ReceivingdetailComponent, IngredientsComponent],
})
export class ReceivingModule { }
