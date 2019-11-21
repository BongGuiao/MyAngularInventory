import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ItemFormulationService } from 'src/app/shared/itemformulation.service';
import { Itemfile } from 'src/app/shared/itemfile.model';
import { UnitTable } from 'src/app/shared/unitTable.model';
import { ItemFileService } from 'src/app/shared/itemfile.service';
import { UnitTableService } from 'src/app/shared/unittable.service';
import { ItemFormulation } from 'src/app/shared/itemformulation.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public formulation: ItemFormulation;
  formDetail = this.service.form;
  title = 'Item Formulation';
  itemFile = this.service.form;
  itemList: Itemfile[] = [];
  units: UnitTable[] = [];
  unitValue: number;

  formData: ItemFormulation;
  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<DetailComponent>,
              private service: ItemFormulationService,
              private itemService: ItemFileService,
              private unitService: UnitTableService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.itemFile.patchValue(this.formData);
    this.getItemList();
    this.getUnitTable();
  }

  onSubmit() {
    this.formData = this.itemFile.value;
    if (this.data.idx == null) {
      this.service.addItems (this.formData)
      .subscribe(resp => {console.log(resp); });
    } else {
      this.service.updateItems(this.formData, this.data.dataRow)
      .subscribe(resp => { console.log(resp); });
    }
    this.close();
  }
  getItemList() {
    this.itemService.getItems(0).subscribe(response => {this.itemList = response;
    }
    , error => {console.log(error); } );
  }
  getUnitTable() {
    this.unitService.getUnitTables('0').subscribe(response => {this.units = response;
    }
    , error => {console.log(error); } );
  }
  onChangeItem(newValue) {
    this.ofSetIssuingUnitValue(newValue);
  }
  ofSetIssuingUnitValue(id: any) {
    this.unitValue = this.itemList.findIndex(x => x.id === id);
    const val = this.itemList[this.unitValue].issuingQtyValue;
    const unitCost: any = this.itemList[this.unitValue].lastCost;
    const recValue: any = this.itemList[this.unitValue].receivingQtyValue;
    const formulaCost: any = (unitCost / recValue ) ;
    const unitId = this.itemList[this.unitValue].issuingUnitId;
    this.formDetail.controls.issuingQtyValue.setValue(val);
    this.formDetail.controls.issuingId.setValue(unitId);
    this.formDetail.controls.unitCost.setValue(formulaCost);
  }
  close() {
    this.dialogRef.close();
  }
}
