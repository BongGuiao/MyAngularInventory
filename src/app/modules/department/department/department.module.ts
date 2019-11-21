import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentComponent } from './department.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DepartmentService } from 'src/app/shared/department.service';
import { DepartmentitemComponent } from '../departmentitem/departmentitem.component';


@NgModule({
  declarations: [DepartmentComponent, DepartmentitemComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [DepartmentitemComponent],
  providers: [DepartmentService]
})
export class DepartmentModule { }
