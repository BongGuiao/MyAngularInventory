import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Grouping } from './grouping.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GroupingService {
    constructor(private http: HttpClient) {}
  formData: Grouping;
  groups: Grouping[];
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    createdBy: new FormControl(''),
    description: new FormControl('', Validators.required),
    updatedBy: new FormControl(''),
    groupCode : new FormControl('', Validators.required),
    dateCreated : new FormControl(''),
    dateUpdated : new FormControl('')
  });
    getGroupings(id) {
      return this.http.get<Grouping[]>('http://localhost:34905/api/Groupings/GetByGroupCode/' + id);
    }

    addGroupings(group: Grouping) {
      return this.http.post<Grouping>('http://localhost:34905/api/groupings', group, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteGroupings(id) {
      return this.http.delete<Grouping>('http://localhost:34905/api/groupings/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateGroupings(group: Grouping, id: number) {
      return this.http.put<Grouping>('http://localhost:34905/api/groupings/' + id, group, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    updateGrouping(group: Grouping, index: number) {
      let idx: number ;
      idx = 0 ;
      for (const idata of this.groups) {
        if (idata.id === group.id) {
          break;
        }
        idx += 1;
      }
      this.groups[idx].id = group.id;
      this.groups[idx].description = group.description;
      this.groups[idx].groupCode = group.groupCode;
      this.updateGroupings(group, group.id).subscribe(
        response => { group = response; }
      , error => {console.log(error); } );
    }

  addGrouping(group: Grouping) {
    this.addGroupings(group).subscribe(
      response => { group = response; this.groups.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(group: Grouping) {
    this.form.setValue(group);
  }
  initializeFormGroup(groupId) {
    this.form.setValue({
      id: null,
      description: '',
      groupCode: groupId,
      createdBy: 'system',
      dateCreated: '',
      updatedBy: 'system',
      dateUpdated: ''
    });
    console.log(this.form.value);
  }

}
