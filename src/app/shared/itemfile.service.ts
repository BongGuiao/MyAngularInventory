import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Itemfile } from './itemfile.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemFileService {
    constructor(private http: HttpClient) {}
  formData: Itemfile;
  items: Itemfile[];
  form: FormGroup = new FormGroup({
    id: new FormControl('0'),
    itemCode: new FormControl('', Validators.required),
    itemGroupId: new FormControl('', Validators.required),
    majorGroupId: new FormControl('', Validators.required),
    overGroupId: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    classCode: new FormControl('', Validators.required),
    receivingUnitId: new FormControl('', Validators.required),
    receivingQtyValue: new FormControl('', Validators.required),
    issuingUnitId: new FormControl('', Validators.required),
    issuingQtyValue: new FormControl('', Validators.required),
    departmentId: new FormControl('', Validators.required),
    posDescription: new FormControl(''),
    parStock: new FormControl(''),
    reorder: new FormControl(''),
    lastCost: new FormControl(''),
    retailPrice: new FormControl(''),
    wholeSalePrice: new FormControl(''),
    lastMovement: new FormControl(''),
    vatable: new FormControl(''),
    markUp: new FormControl(''),
    deleted: new FormControl(''),
    createdBy: new FormControl(''),
    dateCreated: new FormControl(''),
    updatedBy: new FormControl(''),
    dateUpdated: new FormControl('')
  });
    getItems(id) {
      return this.http.get<Itemfile[]>('http://localhost:34905/api/Itemfiles');
    }
    getItemsByClass(id) {
      return this.http.get<Itemfile[]>('http://localhost:34905/api/Itemfiles/getbyclasscode/' + id);
    }

    addItems(item: Itemfile) {
      return this.http.post<Itemfile>('http://localhost:34905/api/itemfiles', item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    deleteItems(id) {
      return this.http.delete<Itemfile>('http://localhost:34905/api/itemfiles/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateItems(item: Itemfile, id: number) {
      return this.http.put<Itemfile>('http://localhost:34905/api/itemfiles/' + id, item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    updateItem(item: Itemfile, index: number) {
      let idx: number ;
      idx = 0 ;
      for (const idata of this.items) {
        if (idata.id === item.id) {
          break;
        }
        idx += 1;
      }
      this.items[idx].id = item.id;
      this.items[idx].description = item.description;
      this.items[idx].classCode = item.classCode;
      this.updateItems(item, item.id).subscribe(
        response => { item = response; }
      , error => {console.log(error); } );
    }

  addItem(item: Itemfile) {
    this.addItems(item).subscribe(
      response => { item = response; this.items.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(item: Itemfile) {
    this.form.setValue(item);
  }
  initializeFormItem() {
    this.form.setValue({
      id: 0,
      itemCode: '',
      description: '',
      itemGroupId: '0',
      majorGroupId: '0',
      overGroupId: '0',
      posDescription: '',
      classCode: 'FG',
      receivingUnitId: '0',
      receivingQtyValue: '0',
      issuingUnitId: '0',
      issuingQtyValue: '0',
      departmentId: '0',
      parStock: '1',
      reorder: '1',
      lastCost: '0.00',
      retailPrice: '0.00',
      wholeSalePrice: '0.00',
      lastMovement: '01/01/2019',
      vatable: '12',
      markUp: '0',
      deleted: 0,
      createdBy: 'system',
      dateCreated: '01/01/2019',
      updatedBy: 'system',
      dateUpdated: '01/01/2019'
    });
  }

}
