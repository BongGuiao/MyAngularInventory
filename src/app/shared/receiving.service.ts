import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RrHead } from './rrhead.model';
import { RrDetail } from './rrdetail.model';
import { ReceivingOrder } from './receivingorder.model';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class ReceivingService {
    constructor(private http: HttpClient) {}
    formHead: RrHead;
    items: RrHead[];
    isValidRrHead: boolean;
    orders: ReceivingOrder;
    form: FormGroup = new FormGroup({
    id: new FormControl(0),
    poHeadId: new FormControl('', Validators.required),
    rrDate: new FormControl('', Validators.required),
    referenceNo: new FormControl('', Validators.required),
    supplierId: new FormControl('', Validators.required),
    terms: new FormControl('', Validators.required),
    baseAmount: new FormControl('', Validators.required),
    vatAmount: new FormControl(''),
    netAmount: new FormControl(''),
    taxClaimed: new FormControl(''),
    amountPaid: new FormControl(''),
    isJournalized: new FormControl(''),
    isKept: new FormControl(''),
    receivedBy: new FormControl('', Validators.required),
    checkedBy: new FormControl('', Validators.required),
    remarks: new FormControl('', Validators.required),
    createdBy: new FormControl(''),
    dateCreated: new FormControl(''),
    updatedBy: new FormControl(''),
    dateUpdated: new FormControl('')
  });

  formDetail: FormGroup = new FormGroup({
    id: new FormControl(0),
    rrHeadId: new FormControl('0', Validators.required),
    poDetailId: new FormControl('0', Validators.required),
    itemId: new FormControl('0', Validators.required),
    receivingId: new FormControl('0', Validators.required),
    receivingQtyValue: new FormControl('1', Validators.required),
    rrQty: new FormControl('1', Validators.required),
    unitCost: new FormControl('0', Validators.required),
    baseCost: new FormControl('0', Validators.required),
    vatAmount: new FormControl('0', Validators.required),
    createdBy: new FormControl(''),
    dateCreated: new FormControl(''),
    updatedBy: new FormControl(''),
    dateUpdated: new FormControl('')
  });
    getItems(id: any) {
      return this.http.get<ReceivingOrder>('http://localhost:34905/api/rrhead/' + id);
    }
    getItem(id: any) {
        return this.http.get<ReceivingOrder>('http://localhost:34905/api/rrhead/getbypoid/' + id);
    }
    getItemById(id: any) {
        return this.http.get<RrDetail>('http://localhost:34905/api/rrdetail/' + id);
    }
    addRrHead(item: RrHead) {
      return this.http.post<RrHead>('http://localhost:34905/api/receivingorder', item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

    addRrDetail(item: RrDetail) {
        return this.http.post<RrDetail>('http://localhost:34905/api/rrdetail', item, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
      }
      updateRrDetail(item: RrDetail, id: number) {
        return this.http.put<RrDetail>('http://localhost:34905/api/rrdetail/' + id, item, {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          });
      }
    deleteItemDetail(id) {
      return this.http.delete<RrDetail>('http://localhost:34905/api/rrdetail/' + id, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }
    updateRrHead(item: RrHead, id: number) {
      return this.http.put<RrHead>('http://localhost:34905/api/rrhead/' + id, item, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      });
    }

  addItem(item: RrHead) {
    this.addRrHead(item).subscribe(
      response => { item = response; this.items.push(response); }
      , error => {console.log(error); } );
  }
  populateForm(item: RrHead) {
      this.form.setValue(item);
  }
  initializeFormItem() {
    this.form.setValue({
      id: 0,
      poHeadId: 0,
      rrDate: '01/01/1900',
      referenceNo: '',
      supplierId: 0,
      terms: '',
      baseAmount: 0,
      vatAmount: 0,
      netAmount: 0,
      taxClaimed: 0,
      amountPaid: 0,
      isJournalized: true,
      isKept: true,
      receivedBy: '',
      checkedBy: '',
      remarks: '',
      createdBy: 'system',
      dateCreated: '01/01/2019',
      updatedBy: 'system',
      dateUpdated: '01/01/2019'
    });
  }
  initializeFormDetailItem() {
    this.formDetail.setValue({
      id: 0,
      rrHeadId: 0,
      poDetailId: 0,
      itemId: 0,
      receivingId: 0,
      receivingQtyValue: 1,
      rrQty: 0,
      unitCost: 0,
      baseCost: 0,
      vatAmount: 0,
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
    const rrDate = pipe.transform(this.form.controls.rrDate.value, 'short');
    this.isValidRrHead = true ;
    if (rrDate === myFormattedDate) {
      this.isValidRrHead = false;
    }

    if (this.form.controls.supplierId.value === 0 || this.form.controls.supplierId.value == null) {
        this.isValidRrHead = false;
    }
    if (this.form.controls.terms.value === '' || this.form.controls.terms.value == null) {
      this.isValidRrHead = false;
    }
    if (this.form.controls.receivedBy.value === '' || this.form.controls.receivedBy.value == null) {
      this.isValidRrHead = false;
    }
    if (this.form.controls.checkedBy.value === '' || this.form.controls.checkedBy.value == null) {
        this.isValidRrHead = false;
      }
    return this.isValidRrHead;
  }
}
