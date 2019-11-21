import { Department } from './department.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
    constructor(private http: HttpClient) {}
  formData: Department;
  departments: Department[];
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    createdBy: new FormControl(''),
    description: new FormControl('', Validators.required),
    updatedBy: new FormControl(''),
    dateCreated : new FormControl(''),
    dateUpdated : new FormControl('')
  });
    getDepartment(id) {
      return this.http.get<Department[]>('http://localhost:34905/api/Departments/');
    }

    addDepartments(department: Department) {
      return this.http.post<Department>('http://localhost:34905/api/departments', department, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteDepartment(id) {
      return this.http.delete<Department>('http://localhost:34905/api/departments/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateDepartments(department: Department, id: number) {
      return this.http.put<Department>('http://localhost:34905/api/departments/' + id, department, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    updateDepartment(department: Department, index: number) {
      let idx: number ;
      idx = 0 ;
      for (const idata of this.departments) {
        if (idata.id === department.id) {
          break;
        }
        idx += 1;
      }
      this.departments[idx].id = department.id;
      this.departments[idx].description = department.description;
      this.updateDepartments(department, department.id).subscribe(
        response => { department = response; }
      , error => {console.log(error); } );
    }

  addDepartment(department: Department) {
    this.addDepartments(department).subscribe(
      response => { department = response; this.departments.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(department: Department) {
    this.form.setValue(department);
  }
  initializeFormGroup(departmentId) {
    this.form.setValue({
      id: null,
      description: '',
      createdBy: 'system',
      dateCreated: '',
      updatedBy: 'system',
      dateUpdated: ''
    });
    console.log(this.form.value);
  }
}