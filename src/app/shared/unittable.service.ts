import { UnitTable } from './unitTable.model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UnitTableService {
    constructor(private http: HttpClient) {}
  formData: UnitTable;
  units: UnitTable[];
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    createdBy: new FormControl(''),
    description: new FormControl('', Validators.required),
    unitValue: new FormControl('', Validators.required),
    updatedBy: new FormControl(''),
    dateCreated : new FormControl(''),
    dateUpdated : new FormControl('')
  });
    getUnitTables(id) {
      return this.http.get<UnitTable[]>('http://localhost:34905/api/UnitTables/');
    }

    addUnitTables(unit: UnitTable) {
      return this.http.post<UnitTable>('http://localhost:34905/api/UnitTables', unit, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteUnitTables(id) {
      return this.http.delete<UnitTable>('http://localhost:34905/api/UnitTables/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateUnitTables(unit: UnitTable, id: number) {
      return this.http.put<UnitTable>('http://localhost:34905/api/UnitTables/' + id, unit, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    updateUnitTable(unit: UnitTable, index: number) {
      let idx: number ;
      idx = 0 ;
      for (const idata of this.units) {
        if (idata.id === unit.id) {
          break;
        }
        idx += 1;
      }
      this.units[idx].id = unit.id;
      this.units[idx].description = unit.description;
      this.units[idx].unitValue = unit.unitValue;
      this.updateUnitTables(unit, unit.id).subscribe(
        response => { unit = response; }
      , error => {console.log(error); } );
    }

  addUnitTable(unit: UnitTable) {
    this.addUnitTables(unit).subscribe(
      response => { unit = response; this.units.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(unit: UnitTable) {
    this.form.setValue(unit);
  }
  initializeFormGroup(unitId) {
    this.form.setValue({
      id: null,
      description: '',
      unitValue: 1,
      createdBy: 'system',
      dateCreated: '',
      updatedBy: 'system',
      dateUpdated: ''
    });
  }

}
