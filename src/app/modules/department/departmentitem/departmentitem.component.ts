import { Department } from './../../../shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-departmentitem',
  templateUrl: './departmentitem.component.html',
  styleUrls: ['./departmentitem.component.scss']
})
export class DepartmentitemComponent implements OnInit {
  public department: Department;
  title = 'Department Profile';
  departmentFile = this.service.form;

  formData: Department;
  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<DepartmentitemComponent>,
              private service: DepartmentService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.departmentFile.patchValue({
      createdBy: this.formData.createdBy,
      id : this.formData.id,
      description: this.formData.description,
      updatedBy : this.formData.updatedBy,
    });
  }

  onSubmit() {
    this.department = this.departmentFile.value;
    if (this.data.idx == null) {
      this.service.addDepartment(this.department);
    } else {
      this.service.updateDepartment(this.department, this.data.dataRow);
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}
