import { FormControl } from '@angular/forms';
import { UnitTable } from './../../../shared/unitTable.model';
import { Department } from './../../../shared/department.model';
import { DepartmentService } from 'src/app/shared/department.service';
import { GroupingService } from './../../../shared/grouping.service';
import { Grouping } from './../../../shared/grouping.model';
import { Itemfile } from './../../../shared/Itemfile.model';
import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ItemFileService } from 'src/app/shared/itemfile.service';
import { UnitTableService } from 'src/app/shared/unittable.service';

@Component({
  selector: 'app-itemdetail',
  templateUrl: './itemdetail.component.html',
  styleUrls: ['./itemdetail.component.scss']
})
export class ItemdetailComponent implements OnInit {
  public item: Itemfile;
  isVisible: false;
  unitValue: number;
  classItem = [{id: 'FG', description: 'Finished Goods'},
              {id: 'RM', description: 'Raw Material'}];
  itemStatus = [{id: 0, description: 'Active'},
                {id: 1, description: 'Deleted'}];
  title = 'Item Master File';
  itemFile = this.service.form;

  itemGroup: Grouping[] = [];
  majorGroup: Grouping[] = [];
  overGroup: Grouping[] = [];
  departments: Department[] = [];
  units: UnitTable[] = [];
  formData: Itemfile;

  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<ItemdetailComponent>,
              private service: ItemFileService,
              private groupService: GroupingService ,
              private departmentService: DepartmentService,
              private unitService: UnitTableService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.itemFile.patchValue({
      createdBy: this.formData.createdBy,
      id : this.formData.id,
      description: this.formData.description,
      updatedBy : this.formData.updatedBy,
    });
    this.getItemGroup();
    this.getMajorGroup();
    this.getOverGroup();
    this.getDepartments();
    this.getUnitTable();
  }
  getItemGroup() {
    this.groupService.getGroupings('01').subscribe(response => {this.itemGroup = response;
    }
    , error => {console.log(error); } );
  }
  getMajorGroup() {
    this.groupService.getGroupings('02').subscribe(response => {this.majorGroup = response;
    }
    , error => {console.log(error); } );
  }
  getOverGroup() {
    this.groupService.getGroupings('03').subscribe(response => {this.overGroup = response;
    }
    , error => {console.log(error); } );
  }
  getDepartments() {
    this.departmentService.getDepartment('0').subscribe(response => {this.departments = response;
    }
    , error => {console.log(error); } );
  }
  getUnitTable() {
    this.unitService.getUnitTables('0').subscribe(response => {this.units = response;
    }
    , error => {console.log(error); } );
  }
  onChangeReceivingUnit(newValue) {
      this.ofSetReceivingUnitValue(newValue);
  }
  onChangeIssuingUnit(newValue) {
    this.ofSetIssuingUnitValue(newValue);
}


  onSubmit() {
    this.item = this.itemFile.value;
    if (this.data.idx == null) {
      this.service.addItem(this.item);
    } else {
      this.service.updateItem(this.item, this.data.dataRow);
    }
    this.close();
  }
  ofSetReceivingUnitValue(id: any) {
    this.unitValue = this.units.findIndex(x => x.id === id);
    const val = this.units[this.unitValue].unitValue.toString();
    this.itemFile.controls.receivingQtyValue.setValue(val);
  }
  ofSetIssuingUnitValue(id: any) {
    this.unitValue = this.units.findIndex(x => x.id === id);
    const val = this.units[this.unitValue].unitValue.toString();
    this.itemFile.controls.issuingQtyValue.setValue(val);
  }
  close() {
    this.dialogRef.close();
  }
}
