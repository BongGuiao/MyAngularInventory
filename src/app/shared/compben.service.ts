import { CompbenTable } from './compben.model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CompbenTableService {
    constructor(private http: HttpClient) {}
  formData: CompbenTable;
  comps: CompbenTable[];
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    createdBy: new FormControl(''),
    description: new FormControl('', Validators.required),
    taxable: new FormControl(true, Validators.required),
    sssIncluded: new FormControl(true, Validators.required),
    piIncluded: new FormControl(true, Validators.required),
    phIncluded: new FormControl(true, Validators.required),
    tMonthIncluded: new FormControl(true, Validators.required),
    updatedBy: new FormControl(''),
    dateCreated : new FormControl(''),
    dateUpdated : new FormControl('')
  });
    getCompbenTables(id) {
      return this.http.get<CompbenTable[]>('http://localhost:34905/api/CompbenTables/');
    }

    addCompbenTables(comp: CompbenTable) {
      return this.http.post<CompbenTable>('http://localhost:34905/api/CompbenTables', comp, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteCompbenTables(id) {
      return this.http.delete<CompbenTable>('http://localhost:34905/api/CompbenTables/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateCompbenTables(comp: CompbenTable, id: number) {
      return this.http.put<CompbenTable>('http://localhost:34905/api/CompbenTables/' + id, comp, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    updateCompbenTable(comp: CompbenTable, index: number) {
      let idx: number ;
      idx = 0 ;
      for (const idata of this.comps) {
        if (idata.id === comp.id) {
          break;
        }
        idx += 1;
      }
      this.comps[idx].id = comp.id;
      this.comps[idx].description = comp.description;
      this.comps[idx].taxable = comp.taxable;
      this.comps[idx].sssIncluded = comp.sssIncluded;
      this.comps[idx].piIncluded = comp.piIncluded;
      this.comps[idx].phIncluded = comp.phIncluded;
      this.comps[idx].tMonthIncluded = comp.tMonthIncluded;
      this.updateCompbenTables(comp, comp.id).subscribe(
        response => { comp = response; }
      , error => {console.log(error); } );
    }

  addCompbenTable(comp: CompbenTable) {
    this.addCompbenTables(comp).subscribe(
      response => { comp = response; this.comps.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(comp: CompbenTable) {
    this.form.setValue(comp);
  }

  initializeFormGroup(unitId) {
    this.form.setValue({
      id: null,
      description: '',
      taxable: true,
      sssIncluded: true,
      piIncluded: true,
      phIncluded: true,
      tMonthIncluded: true,
      createdBy: 'system',
      dateCreated: '',
      updatedBy: 'system',
      dateUpdated: ''
    });
  }
}
