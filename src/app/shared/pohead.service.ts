import { PoDetail } from './podetail.model';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PoHead } from './pohead.model';
import { PurchaseOrder } from './purchaseorder.model';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PoHeadService {
    constructor(private http: HttpClient) {}
    itemClass = 'FG';
    formData: PoHead;
    items: PoHead[];
    isValidPohead: boolean;
    orders: PurchaseOrder;
    form: FormGroup = new FormGroup({
    id: new FormControl(0),
    poDate: new FormControl('', Validators.required),
    supplierId: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
    poAmount: new FormControl('', Validators.required),
    isOpen: new FormControl('', Validators.required),
    requestedBy: new FormControl('', Validators.required),
    preparedDelivery: new FormControl('', Validators.required),
    deliveryInstruction: new FormControl('', Validators.required),
    meridian: new FormControl('', Validators.required),
    remarks: new FormControl('', Validators.required),
    purpose: new FormControl('', Validators.required),
    createdBy: new FormControl(''),
    dateCreated: new FormControl(''),
    updatedBy: new FormControl(''),
    dateUpdated: new FormControl('')
  });

  formDetail: FormGroup = new FormGroup({
    id: new FormControl(0),
    poId: new FormControl('0', Validators.required),
    itemId: new FormControl('0', Validators.required),
    receivingId: new FormControl('0', Validators.required),
    receivingQtyValue: new FormControl('1', Validators.required),
    poQty: new FormControl('1', Validators.required),
    poDeliveredQty: new FormControl('0', Validators.required),
    poBalanceQty: new FormControl('1', Validators.required),
    unitCost: new FormControl('0', Validators.required),
    createdBy: new FormControl(''),
    dateCreated: new FormControl(''),
    updatedBy: new FormControl(''),
    dateUpdated: new FormControl('')
  });
    getItems(id: any) {
      return this.http.get<PoHead[]>('http://localhost:34905/api/purchaseorder');
    }
    getPoHead(id: any) {
      return this.http.get<PoHead>('http://localhost:34905/api/purchaseorder/getbypoid/' + id);
    }
    getItem(id: any) {
        return this.http.get<PurchaseOrder>('http://localhost:34905/api/purchaseorder/' + id);
    }
    getItemByPoId(id: any) {
        return this.http.get<PoDetail>('http://localhost:34905/api/podetail/' + id);
    }
    addPoHead(item: PoHead) {
      return this.http.post<PoHead>('http://localhost:34905/api/purchaseorder', item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    addPoDetail(item: PoDetail) {
        return this.http.post<PoDetail>('http://localhost:34905/api/podetail', item, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
      }
      updatePoDetail(item: PoDetail, id: number) {
        return this.http.put<PoDetail>('http://localhost:34905/api/podetail/' + id, item, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          });
      }
    deleteItemDetail(id) {
      return this.http.delete<PoDetail>('http://localhost:34905/api/podetail/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updatePoHead(item: PoHead, id: number) {
      return this.http.put<PoHead>('http://localhost:34905/api/purchaseorder/' + id, item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

  addItem(item: PoHead) {
    this.addPoHead(item).subscribe(
      response => { item = response; this.items.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(item: PoHead) {
      this.form.setValue(item);
  }
  initializeFormItem() {
    this.form.setValue({
      id: 0,
      poDate: '01/01/1900',
      supplierId: 0,
      supplierName: '',
      terms: '',
      poAmount: 0,
      isOpen: true,
      requestedBy: '',
      preparedDelivery: '01/01/1900',
      deliveryInstruction: '',
      meridian: '',
      remarks: '',
      purpose: '',
      createdBy: 'system',
      dateCreated: '01/01/2019',
      updatedBy: 'system',
      dateUpdated: '01/01/2019'
    });
  }
  initializeFormDetailItem() {
    this.formDetail.setValue({
      id: 0,
      poId: 0,
      itemId: 0,
      receivingId: 0,
      receivingQtyValue: 1,
      unitCost: 0,
      poQty: 1,
      poDeliveredQty: 0,
      poBalanceQty: 0,
      createdBy: 'system',
      dateCreated: '01/01/2019',
      updatedBy: 'system',
      dateUpdated: '01/01/2019'
    });
  }
  ofValidateHeader(): boolean  {
    const blankDate = '01/01/1900';
    const pipe = new DatePipe('en-US');
    const myFormattedDate = pipe.transform(blankDate, 'short');
    const poDate = pipe.transform(this.form.controls.poDate.value, 'short');
    const deliverDate = pipe.transform(this.form.controls.preparedDelivery.value, 'short');
    this.isValidPohead = true ;
    if (poDate === myFormattedDate) {
      this.isValidPohead = false;
    }
    if (deliverDate === myFormattedDate) {
      this.isValidPohead = false;
    }
    if (this.form.controls.supplierId.value === 0 || this.form.controls.supplierId.value == null) {
        this.isValidPohead = false;
    }
    if (this.form.controls.terms.value === '' || this.form.controls.terms.value == null) {
      this.isValidPohead = false;
    }
    if (this.form.controls.requestedBy.value === '' || this.form.controls.requestedBy.value == null) {
      this.isValidPohead = false;
    }
    return this.isValidPohead;
  }
}
