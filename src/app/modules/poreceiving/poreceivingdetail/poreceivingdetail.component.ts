import { UnitTable } from './../../../shared/unitTable.model';
import { Itemfile } from './../../../shared/itemfile.model';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ReceivingService } from 'src/app/shared/receiving.service';
import { ItemFileService } from 'src/app/shared/itemfile.service';
import { UnitTableService } from 'src/app/shared/unittable.service';
import { RrDetail } from './../../../shared/rrdetail.model';
@Component({
  selector: 'app-poreceivingdetail',
  templateUrl: './poreceivingdetail.component.html',
  styleUrls: ['./poreceivingdetail.component.scss']
})
export class PoreceivingdetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<PoreceivingdetailComponent>
            , public service: ReceivingService
            , public itemService: ItemFileService, public unitService: UnitTableService ) {}
  title = 'Receiving Order Item';
  isVisible = false;
  formDetail = this.service.formDetail;
  rrDetail: RrDetail;
  itemList: Itemfile[];
  unitList: UnitTable[];
  unitValue: number;
  unitCost: number;
  unitAmount: number;
  ngOnInit() {
    this.getItemList();
    this.getUnitList();
    this.ofGetRrDetailById(this.data.dataRow.id);
  }
  onSubmit() {
    console.log(this.data.rrId);
    this.rrDetail = this.formDetail.value;
    if (this.data.idx == null || this.data.idx === 0) {
      this.rrDetail.rrHeadId = this.data.rrId.id;
      this.rrDetail.createdBy = 'System';
      this.rrDetail.updatedBy = 'System';
      this.service.addRrDetail(this.rrDetail).subscribe( response => { this.rrDetail = response; });
    } else {
      this.service.updateRrDetail(this.rrDetail, this.rrDetail.id).subscribe(
        response => { this.rrDetail = response;  });
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  getItemList() {
    this.itemService.getItems(0).subscribe(response => {this.itemList = response;
    }
    , error => {console.log(error); } );
  }
  onChangeItem(newValue) {
    if (newValue > 0) {
      this.ofSetReceivingUnitValue(newValue);
      this.ofSetUnitCost(newValue);
    }
  }
  onChangeQuantityAndCost() {
    this.ofCalculateAmount();
  }
  getUnitList() {
    this.unitService.getUnitTables(0).subscribe(response => {this.unitList = response;
    }
    , error => {console.log(error); } );
  }
  ofSetReceivingUnitValue(id: any) {
    this.unitValue = this.itemList.findIndex(x => x.id === id);
    const val = this.itemList[this.unitValue].receivingQtyValue;
    const unitId = this.itemList[this.unitValue].receivingUnitId;
    this.formDetail.controls.receivingQtyValue.setValue(val);
    this.formDetail.controls.receivingId.setValue(unitId);
  }
  ofSetUnitCost(id: any) {
    this.unitValue = this.itemList.findIndex(x => x.id === id);
    const unitCost = this.itemList[this.unitValue].lastCost;
    this.formDetail.controls.unitCost.setValue(unitCost);
    this.unitAmount = this.formDetail.controls.unitCost.value * this.formDetail.controls.rrQty.value;
  }
  ofCalculateAmount() {
    this.unitAmount = this.formDetail.controls.unitCost.value * this.formDetail.controls.rrQty.value;
  }
  ofGetRrDetailById(id) {
    this.service.getItemById(id).subscribe(response => {this.rrDetail = response;
                                                        this.formDetail.setValue(this.rrDetail);
    }
    , error => {console.log(error); } );
  }
}
