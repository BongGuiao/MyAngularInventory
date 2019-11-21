import { Gender } from './../../../shared/employee.service';
import { Employee } from 'src/app/shared/Employee.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Department } from 'src/app/shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./employeedetail.component.scss']
})
export class EmployeedetailComponent implements OnInit {
  public employee: Employee;
  title = 'Employee Profile';
  employeeFile = this.service.form;
  genders =  this.service.gender;
  status = this.service.status;
  empStatus = this.service.empStatus;
  paymode = this.service.payMode;
  departments: Department[] = [];
  formData: Employee;
  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<EmployeedetailComponent>,
              private service: EmployeeService, private departmentService: DepartmentService) {
    this.formData = data.dataRow;
    this.employee = data.dataRow;
  }
  ngOnInit() {
    this.employeeFile.patchValue({
      createdBy: this.formData.createdBy,
      id : this.formData.id,
      firstName: this.formData.firstName,
      middleName: this.formData.middleName,
      lastName: this.formData.lastName,
      presentAddress: this.formData.presentAddress,
      updatedBy : this.formData.updatedBy,
      basicSalary: this.formData.basicSalary,
      biometricCode: this.formData.biometricCode,
      birthDate: this.formData.birthDate,
      branchId: this.formData.branchId,
      civilStatus: this.formData.civilStatus,
      dailyRate: this.formData.dailyRate,
      hourlyRate: this.formData.hourlyRate,
      departmentId: this.formData.departmentId,
      employeeCode: this.formData.employeeCode,
      employmentStatus: this.formData.employmentStatus.trim(),
      mobileNumber: this.formData.mobileNumber,
      dateHired: this.formData.dateHired,
      dateRehired: this.formData.dateRehired,
      dateSeparated: this.formData.dateSeparated,
      payMode: this.formData.payMode.trim(),
      position: this.formData.position,
      section: this.formData.section,
      sex: this.formData.sex,
      taxCode: this.formData.taxCode,
      fullName: this.formData.fullName
    });
    this.getDepartments();
    this.onChanges();
    this.disAbleObjectWhenEdit();
  }
  onChanges() {
    this.employeeFile.get('payMode').valueChanges
    .subscribe(selectedPayMode => {
        if (selectedPayMode === '0') {
            this.employeeFile.get('basicSalary').reset();
            this.employeeFile.get('basicSalary').disable();
        } else {
            this.employeeFile.get('basicSalary').enable();
        }
    });
    this.employeeFile.get('sssFlag').valueChanges
    .subscribe(isNotDeductable => {
        if (isNotDeductable === false) {
            this.employeeFile.get('sssEmployeeShare').reset();
            this.employeeFile.get('sssEmployeeShare').disable();
            this.employeeFile.get('sssEmployerShare').reset();
            this.employeeFile.get('sssEmployerShare').disable();
        } else {
          this.employeeFile.get('sssEmployeeShare').enable();
          this.employeeFile.get('sssEmployerShare').enable();
        }
    });
    this.employeeFile.get('pagibigFlag').valueChanges
    .subscribe(isNotDeductable => {
        if (isNotDeductable === false) {
            this.employeeFile.get('piEmployeeShare').reset();
            this.employeeFile.get('piEmployeeShare').disable();
            this.employeeFile.get('piEmployerShare').reset();
            this.employeeFile.get('piEmployerShare').disable();
        } else {
          this.employeeFile.get('piEmployeeShare').enable();
          this.employeeFile.get('piEmployerShare').enable();
        }
    });
    this.employeeFile.get('philhealthFlag').valueChanges
    .subscribe(isNotDeductable => {
        if (isNotDeductable === false) {
            this.employeeFile.get('phEmployeeShare').reset();
            this.employeeFile.get('phEmployeeShare').disable();
            this.employeeFile.get('phEmployerShare').reset();
            this.employeeFile.get('phEmployerShare').disable();
        } else {
          this.employeeFile.get('phEmployeeShare').enable();
          this.employeeFile.get('phEmployerShare').enable();
        }
    });
    this.employeeFile.get('taxFlag').valueChanges
    .subscribe(isNotDeductable => {
        if (isNotDeductable === false) {
            this.employeeFile.get('taxDeduction').reset();
            this.employeeFile.get('taxDeduction').disable();
        } else {
          this.employeeFile.get('taxDeduction').enable();
        }
    });
  }
  disAbleObjectWhenEdit() {
    this.employeeFile.get('id').disable();
    if (this.data.idx !== null) {
      this.employeeFile.get('employeeCode').disable();
    } else {
      this.employeeFile.get('employeeCode').enable();
    }
  }

  getDepartments() {
    this.departmentService.getDepartment(0).subscribe(response => {this.departments = response;
    }
    , error => {console.log(error); } );
  }

  onSubmit() {

    this.employeeFile.get('hourlyRate').enable();
    this.employeeFile.get('id').enable();
    this.employeeFile.get('employeeCode').enable();
    this.employee = this.employeeFile.value;
    if (this.data.idx == null) {
      if (this.service.checkExistingEmployeeCode(this.employee.employeeCode)) {
        alert('Employee Code already exist');
        return ;
      }
      this.service.addEmployee(this.employee);
    } else {
      this.service.updateEmployee(this.employee, this.data.dataRow);
    }
    this.close();
  }
  basicSalaryChange(newValue: number) {
    const dailyRate = ((newValue * 12) / 314);
    this.employeeFile.get('dailyRate').setValue(dailyRate.toFixed(3));
    this.employeeFile.get('hourlyRate').setValue((dailyRate / 8).toFixed(3));
  }

  dailyRateChange(newValue: number) {
    const hourlyRate = (newValue / 8.00 ).toFixed(3);
    this.employeeFile.get('hourlyRate').setValue(hourlyRate);
  }
  close() {
    this.dialogRef.close();
  }
}
