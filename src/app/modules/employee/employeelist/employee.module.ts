import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/material-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeedetailComponent } from './../employeedetail/employeedetail.component';
import { EmployeeService } from './../../../shared/employee.service';
import { EmployeelistComponent } from './../employeelist/employeelist.component';
import { DepartmentService } from 'src/app/shared/department.service';
@NgModule({
  declarations: [EmployeelistComponent, EmployeedetailComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [EmployeedetailComponent],
  providers: [EmployeeService, DepartmentService]
})
export class EmployeeModule { }
