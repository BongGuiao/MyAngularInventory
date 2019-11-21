import { Component, OnInit, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CompbenTable } from './../../../shared/compben.model';
import { CompbenTableService } from './../../../shared/compben.service';
@Component({
  selector: 'app-compbendetail',
  templateUrl: './compbendetail.component.html',
  styleUrls: ['./compbendetail.component.scss']
})
export class CompbendetailComponent implements OnInit {
  public compbenTable: CompbenTable;
  title = 'Compensation Table Profile';
  comptableFile = this.service.form;

  formData: CompbenTable;
  constructor(@Inject(MAT_DIALOG_DATA)  public data,
              public dialogRef: MatDialogRef<CompbendetailComponent>,
              private service: CompbenTableService) {
    this.formData = data.dataRow;
  }
  ngOnInit() {
    this.comptableFile.patchValue({
      createdBy: this.formData.createdBy,
      id : this.formData.id,
      taxable: this.formData.taxable,
      sssIncluded: this.formData.sssIncluded,
      piIncluded: this.formData.piIncluded,
      phIncluded: this.formData.phIncluded,
      tMonthIncluded: this.formData.tMonthIncluded,
      description: this.formData.description,
      updatedBy : this.formData.updatedBy,
    });
  }

  onSubmit() {
    this.compbenTable = this.comptableFile.value;
    if (this.data.idx == null) {
      this.service.addCompbenTable(this.compbenTable);
    } else {
      this.service.updateCompbenTable(this.compbenTable, this.data.dataRow);
    }
    this.close();
  }
  close() {
    this.dialogRef.close();
  }
}


