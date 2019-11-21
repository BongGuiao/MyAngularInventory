import { GroupitemComponent } from './../groupitem/groupitem.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GroupingsRoutingModule } from './groupings-routing.module';
import { GroupingService } from './../../shared/grouping.service';
import { GroupingsComponent } from './groupings.component';

@NgModule({
  declarations: [GroupingsComponent, GroupitemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GroupingsRoutingModule
  ],
  entryComponents: [GroupitemComponent],
  providers: [GroupingService]
})
export class GroupingsModule { }
