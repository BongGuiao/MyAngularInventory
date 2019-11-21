import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemFormulation } from './itemformulation.model';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RawMaterialcte } from './rawmaterialcte.model';

@Injectable({
  providedIn: 'root'
})
export class ItemFormulationService {
    constructor(private http: HttpClient) {}
  formData: ItemFormulation;
  items: ItemFormulation[];
  formulatedId: number;
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    formulatedId: new FormControl(0, Validators.required),
    itemId: new FormControl(0, Validators.required),
    issuingId: new FormControl(0, Validators.required),
    issuingQtyValue: new FormControl(0),
    formQty: new FormControl(0, Validators.required),
    description: new FormControl(''),
    unit: new FormControl(''),
    unitCost: new FormControl('0'),
    createdBy: new FormControl(''),
    dateCreated: new FormControl(''),
    updatedBy: new FormControl(''),
    dateUpdated: new FormControl('')
  });
  getItems(id) {
    return this.http.get<ItemFormulation[]>('http://localhost:34905/api/itemformulation/getbyformulatedid/' + id);
  }

  addItems(item: ItemFormulation) {
    return this.http.post<ItemFormulation>('http://localhost:34905/api/itemformulation', item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  deleteItems(id) {
    return this.http.delete<ItemFormulation>('http://localhost:34905/api/itemformulation/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
  updateItems(item: ItemFormulation, id: number) {
    return this.http.put<ItemFormulation>('http://localhost:34905/api/ItemFormulation/' + id, item, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  generateRequiredIngredients(id: number) {
    return this.http.get<RawMaterialcte[]>('http://localhost:34905/api/Rawmaterialcte/getbypoid/' + id);
  }
  populateForm(item: ItemFormulation) {
    this.form.setValue(item);
  }
  initializeFormItem() {
    this.form.setValue({
      id: 0,
      formulatedId: this.formulatedId,
      itemId: 0,
      issuingId: 0,
      issuingQtyValue: 0,
      description: '',
      formQty: 0,
      unit: '',
      unitCost: '0.00',
      createdBy: 'system',
      dateCreated: '01/01/2019',
      updatedBy: 'system',
      dateUpdated: '01/01/2019'
    });
  }

}
