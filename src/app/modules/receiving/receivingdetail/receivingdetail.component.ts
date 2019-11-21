import { UnitTable } from './../../../shared/unitTable.model';
import { Itemfile } from './../../../shared/itemfile.model';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PoHeadService } from 'src/app/shared/pohead.service';
import { ItemFileService } from 'src/app/shared/itemfile.service';
import { UnitTableService } from 'src/app/shared/unittable.service';
import { PoDetail } from './../../../shared/podetail.model';
@Component({
  selector: 'app-receivingdetail',
  templateUrl: './receivingdetail.component.html',
  styleUrls: ['./receivingdetail.component.scss']
})
export class ReceivingdetailComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<ReceivingdetailComponent>
            , public service: PoHeadService
            , public itemService: ItemFileService, public unitService: UnitTableService ) {}
  title = 'Purchase Order Item';
  isVisible = false;
  formDetail = this.service.formDetail;
  poDetail: PoDetail;
  itemList: Itemfile[];
  unitList: UnitTable[];
  unitValue: number;
  unitCost: number;
  unitAmount: number;
  ngOnInit() {
    this.getItemList();
    this.getUnitList();
    this.ofGetPoDetailById(this.data.dataRow.id);
  }
  onSubmit() {
    this.poDetail = this.formDetail.value;
    this.poDetail.createdBy = 'System';
    this.poDetail.updatedBy = 'System'
    this.poDetail.poId = this.data.poId.id;

    if (this.data.idx == null || this.data.idx === 0) {
      this.service.addPoDetail(this.poDetail).subscribe( response => { this.poDetail = response; });
    } else {
      this.service.updatePoDetail(this.poDetail, this.poDetail.id).subscribe(
        response => { this.poDetail = response;  });
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
  getItemList() {
    this.itemService.getItemsByClass(this.service.itemClass) .subscribe(response => {this.itemList = response;
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
    this.unitAmount = this.formDetail.controls.unitCost.value * this.formDetail.controls.poQty.value;
  }
  ofCalculateAmount() {
    this.unitAmount = this.formDetail.controls.unitCost.value * this.formDetail.controls.poQty.value;
  }
  ofGetPoDetailById(id) {
    this.service.getItemByPoId(id).subscribe(response => {this.poDetail = response; this.formDetail.setValue(this.poDetail);
    }
    , error => {console.log(error); } );
  }
}
