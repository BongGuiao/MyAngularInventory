import { EmployeeE } from 'src/app/shared/enums/employee_.enum';
import { Employee } from 'src/app/shared/Employee.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
    constructor(private http: HttpClient) {}
  formData: Employee;
  employees: Employee[];
  gender: Gender[] = [
    {value: '0', viewValue: 'Male'},
    {value: '1', viewValue: 'Female'},
    {value: '2', viewValue: 'LGBT'}
  ];
  status: CivilStatus[] = [
    {value: '0', viewValue: 'Single'},
    {value: '1', viewValue: 'Married'},
    {value: '2', viewValue: 'Widower'},
    {value: '3', viewValue: 'Separated'}
  ];
  empStatus: CivilStatus[] = [
    {value: '0', viewValue: 'Contractual'},
    {value: '1', viewValue: 'Permanent'},
    {value: '2', viewValue: 'Probationary'},
    {value: '3', viewValue: 'Separated'}
  ];
  payMode: Paymode[] = [
    {value: '0', viewValue: 'Daily'},
    {value: '1', viewValue: 'Monthly'}
  ];
  form: FormGroup = new FormGroup({
    id: new FormControl({ value: 0, disabled: true }, Validators.required),
    employeeCode: new FormControl({ value: '', disabled: false }, Validators.required),
    biometricCode: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    middleName: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    civilStatus: new FormControl('', Validators.required),
    taxCode: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    homePhone: new FormControl('', Validators.required),
    mobileNumber: new FormControl('', Validators.required),
    presentAddress: new FormControl('', Validators.required),
    emailAddress: new FormControl('', Validators.required),
    dateHired: new FormControl('', Validators.required),
    dateSeparated: new FormControl('', Validators.required),
    dateRehired: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    branchId: new FormControl('', Validators.required),
    section: new FormControl('', Validators.required),
    defaultShiftId: new FormControl('', Validators.required),
    employmentStatus: new FormControl('', Validators.required),
    sssNumber: new FormControl('', Validators.required),
    pagibigNumber: new FormControl('', Validators.required),
    philhealthNumber: new FormControl('', Validators.required),
    tinNumber: new FormControl('', Validators.required),
    payMode: new FormControl('', Validators.required),
    basicSalary: new FormControl('', Validators.required),
    dailyRate: new FormControl('', Validators.required),
    hourlyRate: new FormControl({ value: 0, disabled: true }, Validators.required),
    sssFlag: new FormControl(true),
    sssEmployeeShare: new FormControl({ value: 0, disabled: false }, Validators.required),
    sssEmployerShare: new FormControl({ value: 0, disabled: false }, Validators.required),
    ec: new FormControl(0),
    pagibigFlag: new FormControl(true),
    piEmployeeShare: new FormControl('', Validators.required),
    piEmployerShare: new FormControl('', Validators.required),
    philhealthFlag: new FormControl(true),
    phEmployeeShare: new FormControl('', Validators.required),
    phEmployerShare: new FormControl('', Validators.required),
    taxFlag: new FormControl(true),
    taxDeduction: new FormControl('', Validators.required),
    createdBy: new FormControl(''),
    updatedBy: new FormControl(''),
    dateCreated : new FormControl(''),
    dateUpdated : new FormControl(''),
    fullName : new FormControl('')
  });
    getEmployee(id) {
      return this.http.get<Employee[]>('http://localhost:34905/api/Employees/');
    }

    addEmployees(employee: Employee) {
      return this.http.post<Employee>(EmployeeE.BASE_URL, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteEmployee(id) {
      return this.http.delete<Employee>(EmployeeE.BASE_URL + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateEmployees(employee: Employee, id: number) {
      return this.http.put<Employee>(EmployeeE.BASE_URL + id, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    updateEmployee(employee: Employee, index: number) {
      let idx: number ;
      idx = 0 ;
      for (const idata of this.employees) {
        if (idata.id === employee.id) {
          break;
        }
        idx += 1;
      }
      this.employees[idx].id = employee.id;
      this.updateEmployees(employee, employee.id).subscribe(
        response => { employee = response; }
      , error => {console.log(error); } );
    }

  addEmployee(employee: Employee) {
    this.addEmployees(employee).subscribe(
      response => { employee = response; this.employees.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(employee: Employee) {
    this.form.setValue(employee);
  }
  checkExistingEmployeeCode(employeeCode: string) {
    const existData = this.employees.filter( x => x.employeeCode === employeeCode);
    if (existData.length > 0) {
      console.log(existData);
      return true ;
    }
    return false;
  }
  initializeFormGroup(employeeId) {
    this.form.setValue({
      id: 0,
      employeeCode: '',
      biometricCode: '',
      lastName: '',
      firstName: '',
      middleName: '',
      sex: '',
      civilStatus: '',
      taxCode: '',
      birthDate: '',
      homePhone: '',
      mobileNumber: '',
      presentAddress: '',
      emailAddress: '',
      dateHired: '',
      dateSeparated: '',
      dateRehired: '',
      position: '',
      departmentId: 0,
      branchId: 0,
      section: '',
      defaultShiftId: 0,
      employmentStatus: '',
      sssNumber: '0',
      pagibigNumber: '0',
      philhealthNumber: '0',
      tinNumber: '0',
      payMode: '',
      basicSalary: 0,
      dailyRate: 0,
      hourlyRate: 0,
      sssFlag: true,
      sssEmployeeShare: 0,
      sssEmployerShare: 0,
      ec: 0,
      pagibigFlag: true,
      piEmployeeShare: 0,
      piEmployerShare: 0,
      philhealthFlag: true,
      phEmployeeShare: 0,
      phEmployerShare: 0,
      taxFlag: true,
      taxDeduction: 0,
      createdBy: 'Bong Guiao',
      dateCreated: '09/04/2019',
      updatedBy: 'Bong Guiao',
      dateUpdated: '09/04/2019',
      fullName: ''
    });
  }
}
export interface Gender {
  value: string;
  viewValue: string;
}

export interface CivilStatus {
  value: string;
  viewValue: string;
}

export interface EmploymentStatus {
  value: string;
  viewValue: string;
}

export interface Paymode {
  value: string;
  viewValue: string;
}
